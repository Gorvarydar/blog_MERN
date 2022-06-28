import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token  = req.headers.authorization.split(' ')[1]
    console.log('tokent',token)
    if(!token) {
        return res.status(403).json({message:'token undefined'})
    }
    try{
        const decoded = jwt.verify(token, 'secretkey1')
        console.log(decoded)
        req.userId = decoded._id
        console.log(req.userId)
        
        next()
    } catch(err) {
        res.status(408).json({message:'can`t decoded token'})
    }
}