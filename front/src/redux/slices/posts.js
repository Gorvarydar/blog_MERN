import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import axios from '../../axios'


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/post')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('post/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
     axios.delete(`post/${id}`)
  
})

const initialState = {
    posts:{
        items:[],
        status:'loading'
    },
    tags:{
        items:[],
        status:'loading'
    },
}

const postSlice = createSlice({
    name:'posts',
    initialState,
    reducer:{},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = "loaded"
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = "error"
        },
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = "loaded"
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = "error"
        },
        ///
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(item => item._id !== action.meta.arg)
           
        }
    }
})

export const  postReducer = postSlice.reducer 