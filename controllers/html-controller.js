const db = require("../models");

module.exports.getHome = function(req, res) {


    db.Article.find({ isSaved: false }).then((articles) => {
        console.log(articles);
        res.render("index", { articles });
    }).catch((err) => {

        res.json(err);

    })



}

module.exports.getSavedArticles = function(req, res) {

    db.Article.find({ isSaved: true }).then((articles) => {
        res.render("saved-articles", { articles });

    });

}