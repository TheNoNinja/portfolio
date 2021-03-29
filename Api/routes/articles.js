const express = require('express');
const router = express.Router();

const article_db = require('../db_calls/article_db');

router.get('/', async (req, res) => {
    article_db.GetArticles(data => {
        if (data.IsSuccess){
            let articles = [];

            data.result.forEach(article => {
                articles.push({
                    id: article._fields[0].identity.low,
                    title: article._fields[0].properties.title,
                    blurb: article._fields[0].properties.blurb,
                    date: article._fields[0].properties.date,
                    thumbnail: article._fields[0].properties.thumbnail,
                    content: article._fields[0].properties.content
                });
            });

            res.status(200).json(articles);
        }
        else {
            res.status(500).json({message: "Error while getting articles.", error: data.error});
        }
    });
});

router.get('/:articleId', async (req, res) => {
    article_db.GetArticle(req.params.articleId, data => {
        if (data.IsSuccess){
            res.status(200).json({
                id: data.result[0]._fields[0].identity.low,
                title: data.result[0]._fields[0].properties.title,
                blurb: data.result[0]._fields[0].properties.blurb,
                date: data.result[0]._fields[0].properties.date,
                thumbnail: data.result[0]._fields[0].properties.thumbnail,
                content: data.result[0]._fields[0].properties.content
            });
        }
        else {
            res.status(500).json({message: "Error while getting article.", error: data.error});
        }
    });
});

router.post('/', async (req, res) => {
    const article = {
        title: req.body.title,
        blurb: req.body.blurb,
        date: Date.now(),
        thumbnail: req.body.thumbnail,
        content: req.body.content
    };
    
    article_db.CreateArticle(article, data => {
        if (data.IsSuccess){
            res.status(200).json({
                id: data.result[0]._fields[0].identity.low,
                title: data.result[0]._fields[0].properties.title,
                blurb: data.result[0]._fields[0].properties.blurb,
                date: data.result[0]._fields[0].properties.date,
                thumbnail: data.result[0]._fields[0].properties.thumbnail,
                content: data.result[0]._fields[0].properties.content
            });
        }
        else {
            res.status(500).json({message: "Error while saving article.", error: data.error});
        }
    });
});

router.delete('/:articleId', async (req, res) => {
    article_db.DeleteArticle(req.params.articleId, data => {
        if (data.IsSuccess){
            res.status(200).json({id: req.params.articleId, message: "Article sucessfully deleted"});
        }
        else {
            res.status(500).json({message: "Error while getting article.", error: data.error});
        }
    });
});

router.patch('/:articleId', async (req, res) => {
    let article;

    article_db.GetArticle(req.params.articleId, data => {
        if (data.IsSuccess){
            article = {
                id: data.result[0]._fields[0].identity.low,
                title: req.body.title != undefined ? req.body.title : data.result[0]._fields[0].properties.title,
                blurb: req.body.blurb != undefined ? req.body.blurb : data.result[0]._fields[0].properties.blurb,
                date: req.body.date != undefined ? req.body.date : data.result[0]._fields[0].properties.date,
                thumbnail: req.body.thumbnail != undefined ? req.body.thumbnail : data.result[0]._fields[0].properties.thumbnail,
                content: req.body.content != undefined ? req.body.content : data.result[0]._fields[0].properties.content
            };
        }
        else {
            res.status(500).json({message: "Error while getting article.", error: data.error});
        }
    }).finally(() =>{
        article_db.UpdateArticle(article, data => {
            if (data.IsSuccess){
                res.status(200).json(article);
            }
            else {
                res.status(500).json({message: "Error while updating article.", error: data.error});
            }
        });
    });
});

module.exports = router;