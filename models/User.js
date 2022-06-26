import mongoose from 'mongoose'

const UserShema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    passwordHash: {
        type:String,
        requred:true
    },
    avatarUrl:String
},
    {
        timestamps:true
    }
)

export  default mongoose.Schema('User', UserShema)