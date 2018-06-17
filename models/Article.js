const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

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

    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }],

    isSaved: {
        type: Boolean,
        default: false
    },

    dateAdded: {
        type: Date,
        default: Date.now
    }

});

ArticleSchema.plugin(mongoosePaginate);

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article;