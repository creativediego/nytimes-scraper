$(document).ready(function() {

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