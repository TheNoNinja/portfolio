const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blurb: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    thumbnail: {
        type:String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Article", ArticleSchema)