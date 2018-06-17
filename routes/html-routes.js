const htmlController = require("../controllers/html-controller");
const db = require("../models");

module.exports = function(app) {
    //Show all unsaved scraped articles on home pages
    app.get("/", htmlController.getHomePage);

}