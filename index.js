//Dependencies
require('dotenv').config()
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const flash = require("connect-flash");


mongoURI = "mongodb://localhost/scrapedArticles" || MONGO_URI
mongoose.set("debug", true);
mongoose.connect(mongoURI)

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Use morgan logger for logging requests
app.use(logger("dev"));


//Routes
const htmlRoutes = require("./routes/html-routes")(app);
const apiRoutes = require("./routes/api-routes")(app);

PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Your app is running on port ${PORT}.`));