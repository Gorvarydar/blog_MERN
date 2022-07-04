import {Router} from 'express'
import express from 'express'
import multer from 'multer'
const app = express()
app.use('/upload', express.static('uploads'))

const router = new Router()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads")
    },
    filename:(_,file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

router.post('/upload', upload.single('image'), (req, res) => {
    try{
        res.json({
        url:`/uploads/${req.file.originalname}`
    }) 
    } catch (err) {
        res.status(400).json({message:'cann not upload file'})
    }
})

export default router



