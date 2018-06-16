const htmlController = require("../controllers/html-controller");


module.exports = function(app) {
    app.get("/", htmlController.getHome);
}