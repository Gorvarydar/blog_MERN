import  {body} from 'express-validator'

export const createPostValidation = [
    body("title", 'you must insert article name').isLength({min:3}).isString(),
    body("text", 'you must insert the text').isLength({min:5}).isString(),
    body("tags", 'invalid format of tags').optional().isArray(),
    body("imageUrl", 'invalid URL ').optional().isURL()
]