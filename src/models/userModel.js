const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username Already Exist"],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email Already Exist"],
    required: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  bio: {
    type: String,
  },
  profile_img: {
    type: String,
    default: "https://ik.imagekit.io/8hi5der3y/DefaultImgInsta.jpg",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
