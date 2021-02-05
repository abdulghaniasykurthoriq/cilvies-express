const { check, validationResult } = require("express-validator");

exports.runValidation = (req,res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({
            status:false,
            message:errors.array()[0].msg
        })
    }
    next()
}

exports.validationCreateUser = [
    check('username', "Username can't be empty").notEmpty().matches(/^\S{3,}$/).withMessage('nggak boleh ada spasi di antara kita'),
    check('email', "Email can't be empty").notEmpty().matches(/.+\@..+/).withMessage("Email macam apa ini"),
    check('password', "Password can't be empty").notEmpty().isLength({min:6}).withMessage("Passordnya dikit banget si")
]

exports.validationPostFilm = [
    check('title', "Title can't be empty").notEmpty().isLength({max:30}).withMessage("kepanjangan judulnya"),
    check('description', "Description can't be empty").notEmpty(),
    check('imageUrl','Image URLnya mana cok').notEmpty().matches(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).withMessage('alamatnya ngaco')
]
exports.validationEditFilm = [
    check('title', "Title can't be empty").notEmpty(),
    check('description', "Description can't be empty").notEmpty(),
    check('imageUrl','Image URLnya mana cok').notEmpty().matches(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).withMessage('alamatnya ngaco')   
]

