import  {body} from 'express-validator'

export const registerValidation = [
    body("email", 'email error').isEmail(),
    body("password", 'password  should be not least 5 symbols').isLength({min:5}),
    body("fullName", 'fullName should be not least 3 symbols').isLength({min:3}),
    body("avatarUrl", ' avatar should be only URL ').optional().isURL()
]

export const loginValidation = [
    body("email", 'email error').isEmail(),
    body("password", 'password  should be not least 5 symbols').isLength({min:5}),
    
]

