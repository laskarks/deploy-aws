const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    tag_name: {
        type: String
    }
})

const tag = mongoose.model('Tag', tagSchema)
module.exports = tag