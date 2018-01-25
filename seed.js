//var mongoose = require("mongoose");
var Campground = require("./models/campground");
//var Comment = require("./models/comment");

var mockCampground = [
  {
    name: "Riverside",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1350&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nisi vehicula, consequat neque ut, finibus sapien. Aenean vulputate, libero eget lacinia consectetur, nulla purus tempor dui, quis sodales massa ipsum nec risus. Vestibulum rutrum pellentesque metus, quis euismod lacus hendrerit malesuada.",
    creator_username: "John Doe",
    price: "9",
    location: 'Av. Boa Viagem, 6500 - Boa Viagem, Recife - PE, Brazil',
    lat: -8.1455605,
    lng: -34.9059436
  }
];

function SeedDB(){
  
  //Remove campgrounds
  Campground.remove({}, function(error){
    if (error){
      console.log(error);
    } else {
      console.log("Campgrounds removed");
      
      //Add campgrounds after removed
      mockCampground.forEach(function(campground){
        Campground.create(campground, function(error, campground_created){
          if (error) {
            console.log("error creating campground...");
          } else {
            console.log("campground created");
            
            //Add comments
            // Comment.create({
            //   content: "Nice camp location",
            //   author: "Bob"
            // }, function(error, comment_created){
            //   if (error) {
            //     console.log("error creating comment...");
            //   } else {
            //     campground_created.comments.push(comment_created);
            //     campground_created.save();
            //     console.log("comment created");
            //   }
            // });
          }
        });
      });
    }
  });
}

module.exports = SeedDB;