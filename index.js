import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import postRouter from './routs/postRouter.js'
import authRouter from './routs/authRouter.js'

const app = express()

mongoose.connect('mongodb+srv://cloud:cloud@cluster0.ubakr.mongodb.net/blog?retryWrites=true&w=majority')
    .then(console.log('bD is ok'))
    .catch((err => {
        console.log('error', err)
    }))

app.use(express.json())
app.use('/upload', express.static('uploads'))
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
    console.log(req.file.originalname)
    res.json({
       url:`/uploads/${req.file.originalname}`
    })
})

app.use('/post', postRouter)
app.use('/auth', authRouter)

app.listen(4443, (err) => {
    if(err) {
        console.log(err)
    }
    console.log('Server its fine')
})