const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title Cannot be empty'],
        minlength: [5, "Minimal 5 character"]
    },
    content: {
        type: String,
        required: [10, "Minimal 10 character"]
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date
    },
    tags: [
        {
            type: String
        }
    ]
    
}, {timestamps: {createdAt: 'created_at'}})


const article = mongoose.model('Article', articleSchema)
module.exports = article
