import mongoose from 'mongoose'

const PostShema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    text: {
        type:String,
        required:true,
        unique:true
    },
    tags: {
        type:Array,
        default:[]
    },
    viewsCount: {
        type:String,
        requred:true,
        default:0
    },
    user: {
        type:ObjectId,
        ref:'User',
        requred:true
    },
    postUrl:String
},
    {
        timestamps:true
    }
)

export  default mongoose.model('Post', PostShema)