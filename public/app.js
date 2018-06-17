$(document).ready(function() {

    //Keep track of the current article page count for Async call to load more articles
    let currentArticlePage = 2;

    function fetchArticles() {
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

    //When the user clicks to load more articles
    $(".fetch-articles").on("click", fetchArticles);

    //Fetches more articles from the database, based on the current page count
    function fetchArticles() {

        //Show loader
        $(".loader").toggleClass("hide");

    }


    function buildNotes(notes) {


        //clear old notes
        $(".note").remove();

        //Loop through the notes
        notes.forEach(function(note) {


            const noteCard = `<div class="note alert alert-primary alert-dismissible" role="alert">
                ${note.body}
                <button type="button" class="close edit-note">
                  <span><i class="fas fa-edit"></i></span>
                </button>
                <button type="button" class="close delete-note">
                <span>&times;</span>
              </button>
              </div>`

            $(".notes-modal").find("#article-notes").append(noteCard)


        });
    }

    function fetchNotes(articleId) {
        //Make a get request for the article notes
        $.get("/articles/" + articleId + "/notes").then(function(data) {
            console.log(data)

            //Set the notes-modal id with the article id
            $(".notes-modal").attr("id", data._id)

            //If article contains notes, add note to modal body
            if (data.notes.length > 0) {

                buildNotes(data.notes);


                //If no notes exist, let the user know
            } else {

                const noNotesMessage = `<div id="no-notes-message" class="alert alert-warning alert-dismissible fade show" role="alert">
            No notes added yet. Try adding one.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`

                $(".notes-modal").find("#article-notes").append(noNotesMessage);
            }

            //Show the modal
            $(".notes-modal").modal("show");

        });

    }

    function postNote(articleId, noteBody) {
        $.post("/articles/" + articleId, {
            body: noteBody
        }).then(function(data) {

            fetchNotes(data._id);

        });

    }

    //User clicks to view article notes
    $("body").on("click", ".view-notes", function(e) {

        e.preventDefault();
        //Get the article id associated with the note
        let articleId = $(this).closest(".card").attr("id");

        fetchNotes(articleId);

    });


    //User clicks to save new note
    $(document).on("click", "#save-note", function() {

        const articleId = $(this).closest(".modal").attr("id");
        const noteBody = $(this).closest(".modal").find("#note-body").val()


        //If the note body contains data
        if (noteBody) {

            postNote(articleId, noteBody);

        }

    });

});