var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res){
  res.render("home");
});

router.get("/register", function(req, res){
  res.render("sign_in");
});

router.get("/login", function(req, res) {
    res.render("login");
})

router.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(error, created_user){
    if (error) {
      console.log(error.message);
      req.flash("error", error.message);
      return res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Account created with success, welcome.");
        res.redirect("/campgrounds");
      });
    }
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login",
  failureFlash : true,
  successFlash : true
}), function(req, res){
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out with success");
    res.redirect("/login");
});

module.exports = router;