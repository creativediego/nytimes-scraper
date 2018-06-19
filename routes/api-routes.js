const apiController = require("../controllers/api-controller")

module.exports = function(app) {

    app.get("/scrape/", apiController.scrape);

    app.get("/articles/pages/:page", apiController.fetchMoreArticles);

    app.get("/articles/:id/notes", apiController.getArticleNotes);

    app.post("/articles/:id", apiController.postNewNote);

    app.post("/articles/notes/update/:id", apiController.updateNote);

    app.post("/articles/notes/delete/:id", apiController.deleteNote);

    app.post("/articles/save/:id", apiController.saveArticle);

    app.post("/articles/unsave/:id", apiController.unsaveArticle);



}