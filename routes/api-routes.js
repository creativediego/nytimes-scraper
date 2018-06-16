const db = require("../models");
const apiController = require("../controllers/api-controller");
const axios = require("axios");

module.exports = function(app) {

    app.get("/scrape", apiController.scrape);

    //Get all articles 

    //Scrape articles


    //If article doesn't exist in db, store it

    //Post article to the saved collection

    //Post article notes

    //Get article notes

    //Delete article notes

}