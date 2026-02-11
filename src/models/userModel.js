const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username Already Exist"],
    required: [true, "Username is Required"],
  },
  email: {
    type: String,
    unique: [true, "Email Already Exist"],
    required: [true, "Email is Required"],
  },
  password: {
    type: String,
    unique: [true, "Password is Required"],
  },
  bio: {
    type: String,
  },
  profile_img: {
    type: String,
    default: "https://ik.imagekit.io/8hi5der3y/DefaultImgInsta.jpg",
  },
});

const userMOdel = mongoose.model("Users", userSchema);
module.exports = userMOdel;
