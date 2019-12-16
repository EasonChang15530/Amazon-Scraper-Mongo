$(document).ready(function () {

  $("#view-wishlist").on("click", function () {
    window.location.assign("/wishlist");
  })

  $("#view-mainpage").on("click", function () {
    window.location.assign("/");
  })

  $("#name-sort").on("click", function () {
    window.location.assign("/name");
  })

  // Click the add-wishlist button
  $(".add-wishlist").on("click", function () {
    // Grab the attr associated with the corresponding data from the add-wishlist button
    var thisName = $(this).attr("data-name");
    var thisLink = $(this).attr("data-link");
    var thisImage = $(this).attr("data-image");

    // POST data
    $.ajax({
      method: "POST",
      url: "/api/wishlist",
      data: {
        name: thisName,
        link: thisLink,
        image: thisImage,
      }
    })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
      });
  });

  // Click the action-delete button
  $(".action-delete").on("click", function () {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/wishlist/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted product", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Bootstrap Modal
  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  });

  // Click the save-comment button
  $(".save-comment").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // Grab the attr associated with the corresponding data from the add-wishlist button
    var thisComment = $(this).parent().parent().find("textarea").val();
    // console.log(thisComment);
    // console.log($(this).parent().parent().find("textarea").val());

    var id = $(this).data("id");

    // POST data
    $.ajax({
      method: "POST",
      url: "/api/wishlist/" + id,
      data: {
        comment: thisComment,
      },
    }).then(
      function () {
        console.log("saved comment", id);
        // Reload the page to get the updated list
        location.reload();
      });
  });
});