$(document).ready(function () {

  $("#view-wishlist").on("click", function () {
    app.get('/wishlist', function (req, res) {
      db.Wishlist.find({})
        .then(function (dbWishlist) {
          res.render("wishlist", { products: dbWishlist })
        });
    });
  })

  $("#view-mainpage").on("click", function () {
    app.get('/', function (req, res) {
      db.Product.find({})
        .then(function (dbProduct) {
          res.render("index", { products: dbProduct })
        });
    });
  })

  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })

  // When you click the add-wishlist button
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

});