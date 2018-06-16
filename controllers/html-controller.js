const db = require("../models");

module.exports.getHome = function(req, res) {


    db.Article.find().then((articles) => {
        console.log(articles);

        res.render("index", { articles });
    }).catch((err) => {

        res.json(err);

    })



}