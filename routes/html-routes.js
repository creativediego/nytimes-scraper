const htmlController = require("../controllers/html-controller");


module.exports = function(app, db) {
    app.get("/", htmlController.getHome);
}