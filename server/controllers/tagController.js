const Tag = require('../models/tag')

class TagController {

    static readAll (req,res,next) {
        Tag.find({})
            .then(function (tags) {
                res.status(200).json(tags)
            })
            .catch(next)
    }

}

module.exports = TagController