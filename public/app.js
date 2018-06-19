$(document).ready(function() {

    //Keep track of the current article page count for Async call to load more articles
    let currentArticlePage = 2;

    //User clicks to scrape stories
    $("#scrape-stories").on("click", function(e) {

        e.preventDefault();

        //Status message
        $("#status-message").append(`<p class="alert alert-success">Fetching latest stories...</p>`);

        $.get("/scrape/").then(function(stories) {

            window.location.href = "/"

        });

    })

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
                            <a href="#" class="btn btn-primary save-article">Save article <span class="save-status"><i class="far fa-heart"></i></span></a> 
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

    //User clicks to load more articles
    $(".fetch-articles").on("click", fetchArticles);

    //Helper function that adds note data from API call to the notes modal
    function buildNotes(notes) {

        //Loop through the notes
        notes.forEach(function(note) {


            const noteCard = `<div id="${note._id}" class="note alert alert-primary alert-dismissible" role="alert">
            <div class="note-body">
                ${note.body}
                </div>
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

    //Takes the id of an article and displays a modal with the article notes
    function fetchNotes(articleId) {
        //Empty modal notes and text area from previous state
        $("#article-notes").empty();

        //Clear textarea from previous state
        $("#note-body").val("");

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

    //User clicks to save/unsave article
    $(document).on("click", ".update-save-status", function(e) {

        const article = $(this).closest(".card");
        const articleTitle = $(article).find(".card-header").clone().text();
        const articleId = $(article).attr("id");

        //Depending on the saved status of the article, make the appropriate post request, and show the appropriate result message
        let status;
        $(this).attr("value") === "true" ? status = "unsave" : status = "save";

        //Post new article status
        $.post(`/articles/${status}/${articleId}`).then(function(savedArticle) {

            //Clear previous status message
            $("#status-message").empty();

            //Update state by removing article
            $(article).parent().remove();

            //Add status message
            $("#status-message").append(`<p class="alert alert-success">${savedArticle.msg}</p>`);

        });

    });



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

    //User clicks to update note
    $(document).on("click", ".edit-note", function() {
        //Clear the text inside the note
        $(this).closest(".note").find(".note-body").text("");

        //Get note id
        const noteId = $(this).closest(".note").attr("id");

        //Display a textarea inside the note
        const editNoteArea =
            $(`<form id="update-note-form">
                <div class="form-group">
                    <label>Edit note</label>
                    <textarea name="updateNoteBody" class="form-control" id="update-note-area" rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-primary" id="submit-note-update">Update note</button>
            </form>`);

        //Append note edit area to note
        $("#" + noteId).append(editNoteArea);

    });

    //User clicks to save note update
    $(document).on("click", "#submit-note-update", function() {

        const noteId = $(this).closest(".note").attr("id");
        const noteBody = $("#update-note-area").val().trim();

        //If note body contains data
        if (noteBody) {
            //Post note
            $.post("/articles/notes/update/" + noteId, { updatedNote: noteBody }).then(function(updatedNote) {

                console.log(updatedNote);

                //Remove update note form
                $("#update-note-form").remove();

                //Update the note in the UI
                $("#" + noteId).find(".note-body").text(updatedNote.body);
            });
        }
    });

    $(document).on("click", ".delete-note", function() {

        const note = $(this).closest(".note");
        const noteId = $(this).closest(".note").attr("id");

        $.post("/articles/notes/delete/" + noteId).then(function(message) {

            //remove note from UI
            $(note).remove();
            console.log(message);

        });

    })

});