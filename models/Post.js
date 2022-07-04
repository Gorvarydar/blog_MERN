import mongoose from 'mongoose'

const PostShema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    text: {
        type:String,
        required:true,
        
    },
    tags: {
        type:Array,
        default:[]
    },
    viewsCount: {
        type:Number,
        requred:true,
        default:0
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        requred:true
    },
    imageUrl:String
},
    {
        timestamps:true
    }
)

export  default mongoose.model('Post', PostShema)