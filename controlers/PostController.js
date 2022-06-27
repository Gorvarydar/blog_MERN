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
           await doc.save()
           res.json(doc)

        } catch (err) {

        }
    }
}