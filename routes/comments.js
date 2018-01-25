var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");

/*
/photos/:id/edit	GET	edit
/photos/:id	PATCH/PUT	update
/campgrounds/:id/comments"
*/

//Create comment
router.post("/", middlewareObj.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(error, campground_found){
    if (error){
      console.log("campground not found..");
    } else {
      Comment.create(req.body.comment, function(error, created_comment){
        if (error) {
          console.log("error creating comment..");
        } else {
          created_comment.author = req.user._id;
          created_comment.username = req.user.username;
          var aDate = new Date();
          aDate.setTime(Date.now());
          created_comment.postedAt = aDate.toTimeString();
          created_comment.save();
          campground_found.comments.push(created_comment);
          campground_found.save();
          res.redirect("/campgrounds/" + campground_found._id);
        }
      });
    }
  });
});

//Put edit
router.put("/:comment_id/edit", middlewareObj.isLoggedIn, middlewareObj.checkCommentOwner, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, updated_comment){
    if (error) {
      console.log("error updating comment..");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Delete
router.delete("/:comment_id", middlewareObj.isLoggedIn, middlewareObj.checkCommentOwner, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(error, comment_found){
    if (error) {
      console.log("error finding comment..");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;