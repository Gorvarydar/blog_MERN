import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import postRouter from './routs/postRouter.js'
import authRouter from './routs/authRouter.js'
import cors from 'cors'

const app = express()
app.use(cors())

mongoose.connect('mongodb+srv://cloud:cloud@cluster0.ubakr.mongodb.net/blog?retryWrites=true&w=majority')
    .then(console.log('bD is ok'))
    .catch((err => {
        console.log('error', err)
    }))

app.use(express.json())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads")
    },
    filename:(_,file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

app.post('/upload', upload.single('image'), (req, res) => {
    try{
        res.json({
        url:`/uploads/${req.file.originalname}`
    }) 
    } catch (err) {
        res.status(400).json({message:'cann not upload file'})
    }
})

// app.use('/upload',fileRouter)
app.use('/post', postRouter)
app.use('/auth', authRouter)

app.listen(4443, (err) => {
    if(err) {
        console.log(err)
    }
    console.log('Server its fine')
})