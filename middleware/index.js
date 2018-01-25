var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in.");
  res.redirect("/login");
};

middlewareObj.checkCampgroundOwner = function checkCampgroundOwner(req, res, next){
  Campground.findById(req.params.camp_id, function(error, camp_found){
    if (error || !camp_found){
      req.flash("error", "Campground not found.");
      res.redirect("/campgrounds");
    } else {
      console.log(camp_found);
      if (camp_found.creator.equals(req.user._id)){
        next();
      } else {
        req.flash("error", "You don't own this campground.");
        res.redirect("back");
      }
    }
  });
};

middlewareObj.checkCommentOwner = function checkCommentOwner(req, res, next){
  Comment.findById(req.params.comment_id, function(error, comment_found){
    if (error){
      console.log(error);
    } else {
      if (comment_found.author.equals(req.user._id)){
        next();
      } else {
        req.flash("error", "You don't own this comment.");
        res.redirect("back");
      }
    }
  });
};

module.exports = middlewareObj;