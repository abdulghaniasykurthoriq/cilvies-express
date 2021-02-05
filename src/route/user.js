const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const { runValidation, validationCreateUser } = require('../validation')

router.post('/create', validationCreateUser, runValidation, userController.CreateUser);

router.post('/login', userController.LoginUser);

router.get('/:id', userController.GetUserId)

module.exports = router;