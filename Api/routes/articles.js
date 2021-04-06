const express = require('express')
const router = express.Router()

const Article = require('../db_calls/article')

router.get('/', async (req, res) => {
    try{
        const articles = await Article.find()
        res.status(200).json(articles)
    }
    catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:articleId', async (req, res) => {
    try{
        const article = await Article.findById(req.params.articleId)
        res.status(200).json(article)
    }
    catch (error) {
        res.status(500).json({error: error})
    }
})

router.post('/', async (req, res) => {
    const article = new Article(req.body)

    try {
        const savedArticle = await article.save()
        res.status(200).json(savedArticle)
    }
    catch (error) {
        res.status(500).json({error: error})
    }

})

router.delete('/:articleId', async (req, res) => {
    try{
        const removedPost = await Article.findByIdAndDelete(req.params.articleId)
        if (removedPost) {
            res.status(200).json(removedPost)
        } else {
            res.status(400).json({error: `Article with ID '${req.params.articleId}' didn't exist`})
        }
    }
    catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:articleId', async (req, res) => {
    try{
        const updatedPost = await Article.updateOne({ _id: req.params.articleId }, req.body)
        res.status(200).json(updatedPost)
    }
    catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router