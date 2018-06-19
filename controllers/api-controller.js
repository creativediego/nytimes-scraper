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

module.exports.saveArticle = function(req, res) {
    console.log("SAVING...")

    db.Article.findByIdAndUpdate({ _id: req.params.id }, { $set: { isSaved: true } }, { new: true }).
    then(savedArticle => res.json({ msg: `Saved article "${savedArticle.title}" and moved it to Saved Articles Page.` })).catch(err => console.log(err));

}

module.exports.unsaveArticle = function(req, res) {

    console.log("UNSAVING...")
    db.Article.findByIdAndUpdate({ _id: req.params.id }, { $set: { isSaved: false } }, { new: true }).
    then(savedArticle => res.json({ msg: `Removed article "${savedArticle.title}."` })).catch(err => console.log(err));

}

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
        $("article .story-heading").each(function() {

            //Create a new object for the db with the title of the article and link
            const result = {

                title: $(this).text().trim(),
                link: $(this).find("a").attr("href")

            }

            //If article contains both title and link from scrape
            if (result.title && result.link) {


                db.Article.findOne({ title: result.title, link: result.link }).
                then(articles => {

                    //If article doesn't exist
                    if (!articles) {


                        //Create one
                        db.Article.create(result).then(newArticle => {

                            console.log(newArticle);

                        }).catch((err) => {
                            //If error occurs, send it to the client
                            console.log(err);
                        });

                    }


                }).catch(err => console.log(err));

            }
        });

        //If scraping and db storage successful, display article
        res.redirect("/")

    });


};