const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const Router = require('./routes/index')
const errHandler = require('./middlewares/errHandler')

//Mongoose-Connection
mongoose.connect('mongodb://localhost/mini-wpe', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to mongooDB')
});

//app-use
app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cors())


//morgan
app.use(morgan('tiny'))
// app.use(morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join(' ')
// }))

//app-Router-use
app.use('/', Router)
app.use(errHandler)

//app-listening
app.listen(PORT, () => console.log(`Server listening to ${PORT}`))
