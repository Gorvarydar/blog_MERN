import PostModel from '../models/Post.js'

class PostController {
    async createPost (req, res) {
        try {
            const doc = new PostModel({
                title:req.body.title,
                text:req.body.text,
                tags:req.body.tags,
                viewsCount:req.body.viewsCount,
                user:req.userId,
                postUrl:req.body.postUrl,
            })
           const post = await doc.save()
           res.json(post)

        } catch (err) {
            console.log(err, 'badreq')
            res.status(403).json({message:'can not create a post'})

        }
    }

    async updatePost (req, res) {
        try {
            const postId = req.params.id
           await PostModel.findOneAndUpdate(
                {
                    id:postId
                },
                {
                title:req.body.title,
                text:req.body.text,
                tags:req.body.tags,
                viewsCount:req.body.viewsCount,
                user:req.userId,
                postUrl:req.body.postUrl,
            })
           
           res.json({message:'updated post'})

        } catch (err) {
            console.log(err, 'badreq')
            res.status(403).json({message:'can not create a post'})

        }
    }

    async getAll (req, res) {
        try{
           const posts = await PostModel.find().populate('user').exec()
           console.log(posts) 
           res.json(posts)
        } catch (err) {
            res.status(403).json({message:"post didnt find"})
        }
    }

   async  getOne (req, res) {
        try{
            const postId = req.params.id
            console.log('id', postId)
         PostModel.findOneAndUpdate(
            {
                _id:postId
            },
            {
                $inc:{viewsCount:1}
            },
            {
                returnDocument:'after'
            },
            (err, doc) => {
                if(err) {
                    console.log(err)
                    return res.status(400).json({message:'can not get a post'})
                }
                console.log('doc', doc)
                if(!doc) {
                    return res.status(403).json({message:'post didn`t find'})
                }
               res.json(doc) 
            } 
        ) 
      
        } catch (err) {
            res.status(403).json({message:'error request'})
        }
    }

    async  removePost (req, res) {
        try{
            const postId = req.params.id
         PostModel.findOneAndRemove(
            {
                _id:postId
            },
         
            (err, doc) => {
                if(err) {
                    console.log(err)
                    return res.status(400).json({message:'can not delete a post'})
                }
                console.log('doc', doc)
                if(!doc) {
                    return res.status(403).json({message:'post didn`t find'})
                }
               res.json({message:`post with id ${postId} was successfuly deleted`}) 
            } 
        ) 
      
        } catch (err) {
            res.status(403).json({message:'delete error request'})
        }
    }
}

export default new PostController