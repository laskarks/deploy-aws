const express = require('express')
const Router = express.Router()
const auth = require('../middlewares/auth')
const autho = require('../middlewares/autho')
const Article = require('../controllers/articleController')

Router.get('/',auth,Article.readAll)
Router.get('/myarticles',auth,Article.readMe)
Router.post('/', auth,Article.create)
Router.delete('/:articleId',auth,autho,Article.delete)
Router.put('/:articleId',auth,autho,Article.update)
Router.get('/tags', auth,Article.findByTag)


module.exports =Router