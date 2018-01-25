var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  content: String,
  username: String,
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  postedAt: String
});

module.exports = mongoose.model("Comment", commentSchema);