import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose' 

const app = express()

mongoose.connect('mongodb+srv://cloud:cloud@cluster0.ubakr.mongodb.net/?retryWrites=true&w=majority')
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

app.post('/auth/login', (req, res) => {
    const token = jwt.sign({
        email:req.body.email,
        password:req.body.password
    }, 'secretKey')
    console.log(req.body)
    res.json({message:'Hi post req', token})
})

app.listen(4443, (err) => {
    if(err) {
        console.log(err)
    }
    console.log('Server its fine')
})