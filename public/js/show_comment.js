var comment_field = document.getElementById("edit_field");
var x = document.getElementById("edit_comment");
x.addEventListener("click", function() {
  if (comment_field.style.display === "block") {
        comment_field.style.display = "none";
    } else {
        comment_field.style.display = "block";
    }
});