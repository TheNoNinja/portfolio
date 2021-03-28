const express = require('express');
const router = express.Router();

const Article = require('../models/Article');

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } 
    catch (error) {
        res.status(500).json({message: "Error while getting articles.", errors: error.errors});
    }
});

router.get('/:articleId', async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        res.status(200).json(article);
    } 
    catch (error) {
        res.status(500).json({message: "Error while getting article.", errors: error.errors});
    }
});

router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        blurb: req.body.blurb,
        content: req.body.content,
        thumbnail: req.body.thumbnail
    });
    
    try {
        const savedArticle = await article.save();
        res.status(200).json(savedArticle);
    }
    catch (error){
        res.status(500).json({message: "Error while saving article.", errors: error.errors});
    }
});

router.delete('/:articleId', async (req, res) => {
    try {
        const deletedArticle = Article.remoce({_id: req.params.articleId});
        res.status(200).json(deletedArticle);
    } 
    catch (error) {
        res.status(500).json({message: "Error while deleting article.", errors: error.errors});
    }
});

router.patch('/:articleId', async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        const updatedArticle = await Article.updateOne({_id: req.params.articleId}, {
            $set: {
                title: req.body.title != undefined ? req.body.title : article.title,
                date: req.body.date != undefined ? req.body.date : article.date,
                blurb: req.body.blurb != undefined ? req.body.blurb : article.blurb,
                content: req.body.content != undefined ? req.body.content : article.content,
                thumbnail: req.body.thumbnail != undefined ? req.body.thumbnail : article.thumbnail
            }
        });
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({message: "Error while updating article.", errors: error.errors});
    }
});

module.exports = router;