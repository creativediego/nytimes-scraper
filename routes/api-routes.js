const apiController = require("../controllers/api-controller")

module.exports = function(app) {

    app.get("/scrape", apiController.scrape);

    app.get("/articles/pages/:number", apiController.fetchMoreArticles);

    app.get("/articles/:id/notes", apiController.getArticleNotes);

    app.post("/articles/:id", apiController.postNewNote)

    //Get all articles 

    //Scrape articles


    //If article doesn't exist in db, store it

    //Post article to the saved collection

    //Post article notes

    //Get article notes

    //Delete article notes

}