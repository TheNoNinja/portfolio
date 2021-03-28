const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now,
        required: false
    },
    blurb: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Articles", ArticleSchema);