var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewareObj = require("../middleware");
var geocoder = require("geocoder");

//Index
router.get("/", function(req, res){
  if (req.query.search_input){
    var regex = new RegExp(escapeRegex(req.query.search_input));
    Campground.find({name: regex}, function(error, camps){
      if (error){
        console.log("Error finding camps");
      } else {
        if (camps.length < 1) {
          req.flash("error", "Sorry, no campgrounds found, try again.")
          res.redirect("/campgrounds");
        } else {
          console.log("Camps found with success");
          res.render("campgrounds/campgrounds", {campgrounds: camps});
        }
      }
    });
  } else {
    Campground.find(function(error, camps){
      if (error){
        console.log("Error finding camps");
      } else {
        console.log("Camps found with success");
        res.render("campgrounds/campgrounds", {campgrounds: camps});
      }
    });
  }
});

//New
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//Show
router.get("/:camp_id", function(req, res) {
    Campground.findById(req.params.camp_id).populate("comments").exec(function(error, campground_found){
      if (error || !campground_found){
        req.flash("error", "Campground not found.");
        res.redirect("/campgrounds");
      } else {
        res.render("campgrounds/show", {campground: campground_found});
      }
    });
});

//Create
router.post("/", middlewareObj.isLoggedIn, function(req, res){
  var name = req.body.name;
  var img = req.body.img;
  var desc = req.body.description;
  var creator = req.user._id;
  var creator_username = req.user.username;
  var price = req.body.price;
  geocoder.geocode(req.body.location, function (error, locationData) {
    if (error) {
      console.log(error);
      req.flash("error", "Something went wrong on your location");
      res.redirect("/campgrounds");
    } else {
      if (locationData.error_message){
        var lat = 0;
        var lng = 0;
        var location = req.body.location;
      } else {
        lat = locationData.results[0].geometry.location.lat;
        lng = locationData.results[0].geometry.location.lng;
        location = locationData.results[0].formatted_address;
      }
      var newCamp = {name: name, img: img, description: desc, price: price, creator:creator, location: location, lat: lat, lng: lng, creator_username: creator_username};
      Campground.create(newCamp, function(error, created_campground) {
        if (error) {
          console.log("cannot create campground..");
        } else {
          created_campground.creator_username = req.user.username;
          created_campground.creator = req.user._id;
          created_campground.save();
          res.redirect("/campgrounds/" + created_campground._id);
        }
      });
    }
  });
});

//Edit
router.get("/:camp_id/edit", middlewareObj.isLoggedIn, middlewareObj.checkCampgroundOwner, function(req, res) {
    Campground.findById(req.params.camp_id, function(error, campground_found){
      if (error){
        console.log("error finding campground..");
      } else {
        res.render("campgrounds/edit", {campground: campground_found});
      }
    });
});

//Update
router.put("/:camp_id", middlewareObj.checkCampgroundOwner, function(req, res){
  geocoder.geocode(req.body.location, function (err, locationData) {
    if (err){
      console.log("error updating campground");
      req.flash("error", "Something went wrong on your location");
      res.redirect("/campgrounds");
    } else {
      if (locationData.error_message){
        var lat = 0;
        var lng = 0;
        var location = req.body.location;
      } else {
        lat = locationData.results[0].geometry.location.lat;
        lng = locationData.results[0].geometry.location.lng;
        location = locationData.results[0].formatted_address;
      }
      var lat = locationData.results[0].geometry.location.lat;
      var lng = locationData.results[0].geometry.location.lng;
      var location = locationData.results[0].formatted_address;
      var newData = {name: req.body.name, img: req.body.img, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
      Campground.findByIdAndUpdate(req.params.camp_id, {$set: newData}, function(error, updated_campground){
        if (error){
          console.log("error finding camp..");
        } else {
          req.flash("success","Successfully Updated!");
          res.redirect("/campgrounds/" + updated_campground._id);
        }
      });
    }
  });
});

//Delete
router.delete("/:camp_id", middlewareObj.isLoggedIn, middlewareObj.checkCampgroundOwner, function(req, res){
  Campground.findByIdAndRemove(req.params.camp_id, function(error, campground_found){
    if (error) {
      console.log("error finding camp..");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;