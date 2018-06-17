$(document).ready(function() {

    //Keep track of the current article page count for Async call to load more articles
    let currentArticlePage = 2;

    //When the user clicks to load more articles
    $(".fetch-articles").on("click", fetchArticles);

    //Fetches more articles from the database, based on the current page count
    function fetchArticles() {

        //Show loader
        $(".loader").toggleClass("hide");

        //Get articles for the current page number
        $.get(`/articles/pages/${currentArticlePage}`).then(function(data) {
            console.log(data)

            //Hide loader
            $(".loader").toggleClass("hide");

            if (data.docs.length > 0) {

                //Loop through each article
                data.docs.forEach(function(article) {

                    //Build a card to display the article
                    let articleCard =
                        ` <div class="col-sm-6 mb-3">
                        <div class="card" id="${article._id}">
                            <div class="card-header lead">${article.title}</div>
                          <div class="card-body">
                            <a href="${article.link}" class="btn btn-primary">Read article</a>
                            <a href="#" class="btn btn-primary">Save article</a>
                            <a href="#" class="btn btn-primary notes">Article notes</a>
                          </div>
                        </div>
                      </div>`

                    //Append the article to the DOM
                    $("article .row").append(articleCard);

                });

                //Increment page count for future API calls to load more articles;
                currentArticlePage++;

                //If there are no more articles to display
            } else {

                $("#no-more-articles").remove()
                $("article .row").append(`<p id="no-more-articles" class="alert alert-info"><strong>Holy guacamole!</strong> No articles left to display.</p>`)
            }

        });

    }

    //Whenever a user clicks the notes button corresponding to an article
    $("body").on("click", ".notes", function(e) {

        e.preventDefault();

        const articleId = $(this).closest(".card").attr("id");

        //Make a get request for the article notes
        $.get("/articles/" + articleId).then(function(data) {

        });

        const notesModal = `<div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add notes to this article</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>`

    });

});