import express from 'express'
import mongoose from 'mongoose'
import {registerValidation, loginValidation}  from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import userController from './controlers/UserController.js'

const app = express()

mongoose.connect('mongodb+srv://cloud:cloud@cluster0.ubakr.mongodb.net/blog?retryWrites=true&w=majority')
.then(
    console.log('bD is ok')
)
.catch((err => {
    console.log('error', err)
}))
app.use(express.json())

app.get('/', (req, res)=> {
    res.send('Hello worlddsds2222dsd')
})

app.post('/auth/register', registerValidation, userController.register)

app.post('/auth/login', loginValidation, userController.login)

app.get('/auth/me',checkAuth, userController.checkUser)

app.listen(4443, (err) => {
    if(err) {
        console.log(err)
    }
    console.log('Server its fine')
})