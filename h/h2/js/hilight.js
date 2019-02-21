$(function() {
 console.log("from mark js")
  var mark = function() {
  

    // Read the keyword
    var keyword = $("input[name='search']").val();
    console.log(keyword)

    // Determine selected options
    var options = {"0":"separateWordSearch","1":"diacritics"};
  

    // Remove previous marked elements and mark
    // the new keyword inside the context
    $(".context").unmark({
      done: function() {
        $(".context").mark(keyword, options);
      }
    });
  };

  $("input[name='search']").on("input", mark);
  

});
