const express = require('express')
const Router = express.Router()
const UserRouter = require('./userRouter')
const ArticleRouter = require('./articleRouter')
const tagRouter = require('./tagRouter')

Router.use('/users', UserRouter)
Router.use('/articles', ArticleRouter)
Router.use('/tags', tagRouter)

module.exports = Router