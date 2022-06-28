import express from 'express'
import mongoose from 'mongoose'
import {registerValidation, loginValidation}  from './validations/auth.js'
import {createPostValidation} from './validations/dataValidation.js'
import checkAuth from './utils/checkAuth.js'
import userController from './controlers/UserController.js'
import PostController from './controlers/PostController.js'
import multer from 'multer'

const app = express()


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads")
    },
    filename:(_,file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

mongoose.connect('mongodb+srv://cloud:cloud@cluster0.ubakr.mongodb.net/blog?retryWrites=true&w=majority')
.then(
    console.log('bD is ok')
)
.catch((err => {
    console.log('error', err)
}))
app.use(express.json())

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file.originalname)
    res.json({
       url:`/uploads/${req.file.originalname}`
    })
})

app.get('/', (req, res)=> {
    res.send('Hello worlddsds2222dsd')
})

app.post('/auth/register', registerValidation, userController.register)
app.post('/auth/login', loginValidation, userController.login)
app.get('/auth/me',checkAuth, userController.checkUser)

app.post('/post',checkAuth, createPostValidation, PostController.createPost)
app.get('/post', PostController.getAll)
app.get('/post/:id', PostController.getOne)
app.delete('/post/:id',checkAuth, PostController.removePost)
app.patch('/post/:id',checkAuth, PostController.updatePost)

app.listen(4443, (err) => {
    if(err) {
        console.log(err)
    }
    console.log('Server its fine')
})