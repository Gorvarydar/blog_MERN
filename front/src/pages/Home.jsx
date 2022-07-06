import React, { useCallback, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { useState } from 'react';
import { useMemo } from 'react';

export const Home = () => {
  const dispatch = useDispatch()
  const {posts, tags, imageUrl} = useSelector(state => state.posts)
  const userData = useSelector(state => state.auth.data)
  const [sort, setSort] = useState(false)
  const [value, setValue] = useState('one');

  const sortedPosts = useMemo(() => {
    const sortArr = [...posts.items]
    sortArr.sort(function(e, i) {
      if(e.viewsCount > i.viewsCount) {
        return -1
      }else if(e.viewsCount < i.viewsCount) {
        return 1
      }
        return 0
      })
      return sortArr
  },[sort,posts])

 console.log(sortedPosts)
  const getSortedPosts = () => {
    setSort(true)
  }
  const getNewPosts =() => {
     setSort(false)
  }

  useEffect(() => {
   dispatch(fetchPosts())
   dispatch(fetchTags())
   setSort(false)
  },[])

  const sorPosts = sort ? sortedPosts : posts.items
  console.log(sorPosts, 'new sort')

  const isPostLoading = posts.status === 'loading'
  const isTagsLoading =  tags.status === 'loading'

  const handleChange = ( e,newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} aria-label="basic tabs example"  onChange={handleChange}>
        <Tab label="Новые" onClick={getNewPosts} value={'one'}/>
        <Tab label="Популярные" onClick={getSortedPosts} value={'two'} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)]:sorPosts).map((obj, index) =>
           isPostLoading ? (
           <Post key ={index} isLoading = {true}/>
           ):(
            <Post
              key ={index}
              id={obj._id}
              title={obj.title}
              imageUrl= {'http://localhost:4443' + obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
