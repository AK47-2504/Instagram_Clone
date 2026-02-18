const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  img_url: {
    type: String,
    required: [true, "Image URL is Required"],
  },
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is Required for creating an Post"],
  },
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
