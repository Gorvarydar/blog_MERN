import {Router} from 'express'
import {createPostValidation} from '../validations/dataValidation.js'
import checkAuth from '../utils/checkAuth.js'
import PostController from '../controlers/PostController.js'

const router = new Router()

router.post('/', checkAuth, createPostValidation, PostController.createPost)
router.get('/',  PostController.getAll)
router.get('/:id',  PostController.getOne)
router.delete('/:id', checkAuth, PostController.removePost)
router.patch('/:id',checkAuth, PostController.updatePost)


export default router