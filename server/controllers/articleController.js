const Article = require('../models/article')
const Tag = require('../models/tag')

class ArticleController{

    static create(req,res,next) {
        const authorId = req.decoded.id
        Article.create({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            author: authorId,
            tags: req.body.tags
        })
        .then(function (article) {
            let taglist = article.tags
            Tag.find({})
                .then(function (tags) {
                    console.log(taglist)
                    for (let i = 0; i < taglist.length; i++) {
                        let sameList = false
                        for (let j = 0; j < tags.length;j++) {
                            
                            if (taglist[i] === tags[j].tag_name) {
                                sameList = true
                            }
                        }
                        if (sameList == false) {
                            Tag.create({
                                tag_name: taglist[i]
                            })
                        }
                    }
                    res.status(201).json(article)
                })
                .catch(next)
        })
        .catch(next)
    }

    static readMe (req,res,next) {
        const userId = req.decoded.id
        Article.find({author: userId})
            .then(function(articles) {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static readAll (req,res,next) {
        Article.find({})
            .then(function (articles) {
                res.status(200).json(articles)
                console.log(articles)
            })
            .catch(next)
    }

    static findByTag(req,res,next) {
        const findTags = req.body.tags
        Article.find({})
            .then(function (articles) {
                let articlelist = [];
                articles.forEach(function (article) {
                    let findIt = false
                    for (let i = 0; i < findTags.length; i++) {
                        for (let j = 0; j < article.tags.length; j++) {
                            if (findTags[i] == article.tags[j]) {
                                findIt = true
                            }
                        }
                    }
                    if (findIt == true) {
                        articlelist.push(article)
                    }
                })
                res.status(200).json(articlelist)
            })
            .catch(next)
    };

    static delete (req,res,next) {
        const id = req.params.articleId
        Article.findOneAndDelete({_id: id})
            .then(function (deleted) {
                res.status(202).json({message: `${deleted.title} has been deleted!`})
            })
            .catch(next)
    }

    static update (req,res,next) {
        const id= req.params.articleId
        let { title, content } = req.body
        console.log(req.body)
        Article.findOneAndUpdate({_id:id}, {
            title,
            content
        },{omitUndefined: true, new: true})

        .then(function (article) {
            res.status(202).json({message: `${article.title} successfully updated!`})
        })
        .catch(next)
    };

    static updateTag (req,res,next) {
        const id = req.params.articleId
        const taglist = req.body.taglist
        Article.findOne({_id: id})
            .then(function (article) {
                
            })
    }

}

module.exports = ArticleController