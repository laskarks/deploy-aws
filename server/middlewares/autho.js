const Article = require('../models/article')
module.exports = (req,res,next) => {
    Article.findOne ({_id: req.params.articleId})
        .then(function (article) {
            if (article.author == req.decoded.id) {
                next()
            }else {
                next({
                    status: 403, message: 'You dont have authorize to do that'
                })
            }
        })
        .catch(next)
}