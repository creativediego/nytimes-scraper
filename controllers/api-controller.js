const db = require("../models");
const apiController = require("../controllers/api-controller");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports.fetchMoreArticles = function(req, res) {

    db.Article.paginate({}, { page: req.params.page, limit: 10 }, function(err, result) {
        res.json(result);

    });

};

module.exports.getArticleNotes = function(req, res) {


    db.Article.findOne({ _id: req.params.id }).
    populate("notes").
    exec(function(err, note) {

        if (err) throw err

        res.json(note)

    });

};

module.exports.postNewNote = function(req, res) {


    db.Note.create(req.body).
    then(dbNote => db.Article.findByIdAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true })).
    then(dbArticle => res.json(dbArticle)).catch(err => console.log(err));


}

module.exports.updateNote = function(req, res) {

    db.Note.findByIdAndUpdate({ _id: req.params.id }, { $set: { body: req.body.updatedNote } }, { new: true }).
    then(data => res.json(data)).catch(err => console.log(err));


}

module.exports.deleteNote = function(req, res) {

    //console.log("deleting...")
    db.Note.deleteOne({ _id: req.params.id }).then(res.json({ msg: "note deleted successfully" }))

}

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


};