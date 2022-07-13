import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "../../axios.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


export const Index = (props) => {
  const {id} = useParams()
  const [comment, setComment] = useState({id:'',fullName:'',avatarUrl:'',comments:'',postId:''})
  const {_id, fullName, avatarUrl} = props.post.user
  const postId = props.post._id
  

  const handleSubmit = (comm) => {
    setComment({id:_id, fullName:fullName, avatarUrl:avatarUrl,comments:comm,postId:postId})
    props.addComent(comm)
  }


  // const addNewComment = (comment) => {
  // //   props.addComent(comment)
  // //   console.log(comment,'c1')
  // //   const addComm = [...newComments, comment]
  // //   const fields = {
  // //     comments:addComm
  // // }
  // // if(comment) {
  // //   await axios.patch(`/post/${id}`, fields)
  // //   setComment({id:'',fullName:'',avatarUrl:'',comments:''})
  // // }
  // // console.log('something wrong')
  // props.addComent(comment)
  // }
  const updateCommList = (comment) => {
    props.addNewComment(comment)
    props.addComent(comment)
    setComment({id:'',fullName:'',avatarUrl:'',comments:'',postId:''})
  }
   
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => handleSubmit(e.target.value)}
            value={comment.comments}
          />
          <Button onClick ={()=>updateCommList(comment)} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
