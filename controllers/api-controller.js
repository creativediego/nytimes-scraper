const db = require("../models");
const apiController = require("../controllers/api-controller");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports.scrape = (req, res) => {

    //Use the axios module to make a request to the URL
    axios.get("http://nytimes.com").then((response) => {

        //Use cheerio to load the URL's body and to traverse it like jQuery
        const $ = cheerio.load(response.data);


        //Loop over each article heading
        $(".story-heading").each(function() {

            //Create a new object for the db with the title of the article and link
            const result = {

                title: $(this).text().trim(),
                link: $(this).children("a").attr("href")

            }

            console.log(result);

            //Create a new db Article using the result object
            db.Article.create(result).then((dbArticle) => {

                console.log(dbArticle);

            }).catch((err) => {

                //If error occurs, send it to the client
                return res.json(err);


            });

        });
        // console.log(result);
        //If scraping and db storage successful, send message to the client
        res.send("Scraping Successful!")

    });


}