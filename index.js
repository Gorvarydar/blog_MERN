import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {registerValidation}  from './validations/auth.js'
import { validationResult } from 'express-validator/src/validation-result.js'
import UserModel from './models/User.js'
import bcrypt, { hash } from 'bcrypt'
import User from './models/User.js'
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

app.post('/auth/register', registerValidation, async (req, res) => {
    try{
        const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    const password = req.body.password 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        email:req.body.email,
        fullName:req.body.fullName,
        avatarUrl:req.body.avatarUrl,
        passwordHash:hash,
    })

const user = await doc.save()

    const token = jwt.sign({
        _id:user._id
    },
    "secretkey1",
    {
        expiresIn:'4h'
    })
    const {passwordHash, ...userData} = user._doc
    res.json({userData, token}) 
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'Invalid registration'})
    }

})

app.post('/auth/login', async (req, res) => {
    try{
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if(!candidate) { 
            return res.status(400).json({message:"User with this email didn`t find"})
        }
        const comparePass = bcrypt.compareSync(password,candidate.passwordHash)
        if(!comparePass) {
            return res.status(400).json({message:'Wrong password'})
        }
       
        const token = jwt.sign({
            _id:candidate._id
        },
        "secretkey1",
        {
            expiresIn:'4h'
        })
        const {passwordHash, ...userData} = candidate._doc
        res.json({...userData, token}) 

    } catch(err) {
        return res.status(500).json({message:'Login error'})
    }
})




app.listen(4443, (err) => {
    if(err) {
        console.log(err)
    }
    console.log('Server its fine')
})