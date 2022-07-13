import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useState } from "react";
import { useEffect } from "react";

import axios from "../axios";
import ReactMarkdown from 'react-markdown'
import useDebounce from "../hooks/useDebounce";


export const FullPost = () => {
  const {id} = useParams()
  console.log(id)
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [one, setOne] = useState('')
  const [calback, setCalback] = useState([])
  
  // const arrCommMemo = useMemo(() => {
  //   if(data.comments.length > comments.length) {
  //     return data.comments
  //   }
  //   return comments
  // },[comments])

 console.log(data, 'data')
 
  const addComent = (comment) => {
    setOne(comment)
}
 

const fetchPOst = () => {
  axios.get(`/post/${id}`)
  .then(res => {
    setData(res.data)   
    setIsLoading(false)
  })
  .catch(err => console.log(err,'error in get req'))
}

const debounceFetch = useDebounce(fetchPOst, 500)

  useEffect(() => {
    // const fetchPOst = () => {
    //   axios.get(`/post/${id}`)
    //   .then(res => {
    //     setData(res.data)   
    //     setIsLoading(false)
    //   })
    //   .catch(err => console.log(err,'error in get req'))
    // }
   
    debounceFetch()
  },[one])


  const addNewComment = (comm) => {
    const arr = [...data.comments,comm]
    setComments(arr)
    const fields = {
      comments:arr
    }
    axios.patch(`/post/${id}/comm`,fields)
  }

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }


  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl= {'http://localhost:4443' + data.imageUrl}
        isFullPost
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
      >
        <p>
          {data.text}
        </p>
        <ReactMarkdown children={data}  />
      </Post>

      <CommentsBlock
        post= {data.comments}                                
        isLoading={false}
        
      >
        <Index addNewComment={addNewComment} addComent={addComent} post= {data}/>
      </CommentsBlock>
    </>
  );
};
