const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    note: {

        type: Schema.Types.ObjectId,
        ref: "Note"
    }

});

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article;