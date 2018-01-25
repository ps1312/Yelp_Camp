var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  lat: Number,
  lng: Number,
  location: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  creator_username: String,
  price: String
});

module.exports = mongoose.model("Campground", campgroundSchema);