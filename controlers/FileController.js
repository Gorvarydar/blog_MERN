import multer from 'multer'

class FileController {
     storage = multer.diskStorage({
        destination: (_, __, cb) => {
            cb(null, "uploads")
        },
        filename:(_,file, cb) => {
            cb(null, file.originalname)
        }
    })

    
}

export default new FileController