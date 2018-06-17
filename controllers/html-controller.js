const db = require("../models");

module.exports.getHomePage = function(req, res) {

    db.Article.paginate({}, { limit: 10 }, function(err, result) {
        res.render("index", { result });
        // result.docs
        // result.total
        // result.limit - 10
        // result.page - 3
        // result.pages
    });

}


module.exports.getSavedArticles = function(req, res) {

    db.Article.find({ isSaved: true }).then((articles) => {
        res.render("saved-articles", { articles });

    });

}