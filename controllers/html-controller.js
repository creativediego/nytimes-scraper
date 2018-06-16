const db = require("../models");

module.exports.getHome = function(req, res) {

    db.Article.find({}).then((articles) => {

        res.render("index", { articles });
    })



}