const express = require('express');
const router = express.Router();

const Article = require('../models/Article');

router.get('/', (req, res) =>{
    req.send("all articles");
});

router.post('/', (req, res) =>{
    console.log(req.body);
});

module.exports = router;