//var mongoose = require("mongoose");
var Campground = require("./models/campground");
//var Comment = require("./models/comment");

var campgrounds_data = [
  {
    name: "Riverside",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1350&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nisi vehicula, consequat neque ut, finibus sapien. Aenean vulputate, libero eget lacinia consectetur, nulla purus tempor dui, quis sodales massa ipsum nec risus. Vestibulum rutrum pellentesque metus, quis euismod lacus hendrerit malesuada.",
    creator_username: "John Doe",
    price: "9"
  },
  {
    name: "Waterfalls",
    img: "https://images.unsplash.com/photo-1442850473887-0fb77cd0b337?auto=format&fit=crop&w=1350&q=80",
    description: "Phasellus feugiat euismod sem, et aliquam magna. Vivamus in est elementum tortor maximus pulvinar nec eu sem. Cras volutpat nulla arcu, eget lacinia erat vehicula eu. Maecenas condimentum nec nunc id tristique. Fusce cursus bibendum orci, vitae consectetur elit auctor nec. Vestibulum luctus mattis condimentum.",
    creator_username: "John Doe",
    price: "22"
  },
  {
    name: "Canyonview",
    img: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?auto=format&fit=crop&w=1350&q=80",
    description: "Sed faucibus metus sed elit volutpat ultrices. Sed lorem nibh, pharetra id sodales ac, gravida vel dui. Nullam condimentum euismod tortor a tristique. Maecenas pharetra magna nisi, nec suscipit ante congue et. Donec vehicula diam lectus, faucibus scelerisque justo iaculis non. Sed ullamcorper efficitur condimentum.",
    creator_username: "John Doe",
    price: "90"
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
      campgrounds_data.forEach(function(campground){
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