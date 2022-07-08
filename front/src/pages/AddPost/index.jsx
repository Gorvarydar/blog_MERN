import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams} from 'react-router-dom';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import { useRef } from 'react';
import axios from '../../axios';
import { useState } from 'react';
import { useEffect } from 'react';


export const AddPost = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = useState('')
  const isAuth = useSelector(selectIsAuth)
  const [data, setData] = useState()
  const inputRef = useRef(null)
  console.log('isAuth', isAuth)
  console.log(text , title, tags)
  const {id} = useParams()
  const isEditable = Boolean(id)

  

  const getData = async(id) => {
    try{
       const {data} = await axios.get(`/post/${id}`) 
       setData(data.data)
       setTags(data.tags)
       setText(data.text)
       setTitle(data.title)
       setImageUrl(data.imageUrl)
      
  }catch(err) {
    console.warn(err)
  }
    }

  useEffect(()=> {
   getData(id)
   console.log({title, text,tags,data})
  },[])

  const handleChangeFile = async (e) => {
    try{
      const formData = new FormData
      formData.append('image', e.target.files[0])
      const {data} = await axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch(err) {
      alert(err)
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true)
       const fields = {
        title,
        imageUrl,
        text,
        tags:tags.slice(',')
       }
       const {data} = !isEditable ? await axios.post('/post', fields): await axios.patch(`/post/${id}`, fields)
       const _id = !isEditable ? data._id : id
       console.log(_id)
       navigate(`/posts/${_id}`)

    } catch(err) {
      alert(err, 'file upload error')
    }
  }
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(!isAuth && localStorage.getItem('token')) {
    return <Navigate to= '/'/>
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large" onClick={() => inputRef.current.click()}>
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} ref = {inputRef}hidden />
     
      {imageUrl && (
        <>
          <img className={styles.image} src={`http://localhost:4443${imageUrl}`} alt="Uploaded" />
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        </>
      
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e=>setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
        classes={{ root: styles.tags }}
         variant="standard" 
         placeholder="Тэги"
         value={tags}
        onChange={e=>setTags(e.target.value)} 
         fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" onClick = {onSubmit} variant="contained">
         {isEditable ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button  size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
