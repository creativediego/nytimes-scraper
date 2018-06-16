//Dependencies
require('dotenv').config()
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
const flash = require("connect-flash");
//const db = require("./models");

mongoose.connect(process.env.MONGO_URI)

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//Routes
const apiRoutes = require("./routes/html-routes")(app);


PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Your app is running on port ${PORT}.`));