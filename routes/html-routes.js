const htmlController = require("../controllers/html-controller");


module.exports = function(app) {
    //Show all unsaved scraped articles on home pages
    app.get("/", htmlController.getHome);

    //Show all saved scraped articles on the Saved Articles page
    app.get("/", htmlController.getHome);
}