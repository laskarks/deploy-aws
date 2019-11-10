const express = require('express')
const Router = express.Router()
const Tag = require('../controllers/tagController')


Router.get('/', Tag.readAll)


module.exports = Router