
// When you click the savenote button
$(document).on("click", ".add-wishlist", function() {
  // Grab the id associated with the article from the submit button
  var thisName = $(this).attr("data-name");
  var thisLink = $(this).attr("data-link");
  var thisImage = $(this).attr("data-image");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/api/wishlist",
    data: {
      // Value taken from title input
      name: thisName,
      // Value taken from note textarea
      link: thisLink,
      image: thisImage,
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
    });

});
