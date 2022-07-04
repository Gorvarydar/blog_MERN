import jwt from 'jsonwebtoken'

export default async(req, res, next) => {
    // const token  = await req.headers.authorization.split(' ')[1]
    const token  = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    console.log(req.headers.authorization, 'HEADERS')
    console.log('tokent',token)
    if(!token) {
        return res.status(403).json({message:'token undefined'})
    }
    try{
        const decoded = jwt.verify(token, 'secretkey1')
        req.userId = decoded._id
        next()
    } catch(err) {
        res.status(408).json({message:'can`t decoded token'})
    }
}