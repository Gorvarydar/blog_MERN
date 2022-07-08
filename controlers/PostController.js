import PostModel from '../models/Post.js'

class PostController {
    async createPost (req, res) {
        try {
            const doc = new PostModel({
                title:req.body.title,
                text:req.body.text,
                tags:req.body.tags.split(','),
                viewsCount:req.body.viewsCount,
                user:req.userId,
                imageUrl:req.body.imageUrl,
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
                tags:req.body.tags.split(','),
                viewsCount:req.body.viewsCount,
                user:req.userId,
                imageUrl:req.body.imageUrl,
            })
           res.json({message:'updated post'})
        } catch (err) {
            console.log(err, 'badreq')
            res.status(403).json({message:'can not create a post'})

        }
    }
    async getTags (req, res) {
        try{
            const posts = await PostModel.find().limit(7).exec()
            const tags = Array.from(new Set((posts.map(i => i.tags).flat()).slice(0, 7)))
            
            res.json(tags)
         } catch (err) {
             res.status(403).json({message:"tags didnt find"})
         }
    }

    async getAll (req, res) {
        try{
            const {type} = req.query
           const posts = await PostModel.find({}).sort({createdAt:'descending'}).populate('user').exec()
           res.json(posts)
        } catch (err) {
            res.status(403).json({message:"post didnt find"})
        }
    }

    // async getFiles (req, res) => {
    //     try{
    //         const {sort} = req.query
    //         let postsFiles
    //         switch(sort) {
    //             case 'new':
    //                 files = 
    //         }
    //     }catch(err) {

    //     }
    // }

   async  getOne (req, res) {
        try{
            const postId = req.params.id
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
                if(!doc) {
                    return res.status(403).json({message:'post didn`t find'})
                }
               res.json(doc) 
            } 
        ).populate('user')
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