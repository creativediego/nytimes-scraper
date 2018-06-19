const apiController = require("../controllers/api-controller")

module.exports = function(app) {

    app.get("/scrape", apiController.scrape);

    app.get("/articles/pages/:number", apiController.fetchMoreArticles);

    app.get("/articles/:id/notes", apiController.getArticleNotes);

    app.post("/articles/:id", apiController.postNewNote);

    app.post("/articles/notes/update/:id", apiController.updateNote);

    app.post("/articles/notes/delete/:id", apiController.deleteNote);



}