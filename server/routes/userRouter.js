const express = require('express')
const Router = express.Router()
const userController = require('../controllers/userController')


Router.get('/',userController.readAll)
Router.post('/', userController.createNewUser)
Router.post('/login',userController.login)
Router.post('/googlelogin',userController.googleLogin)

module.exports = Router