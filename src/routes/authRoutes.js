const express = require("express");
const userModel = require("../models/userModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const authRouter = express.Router;

authRouter.post(
  "/register",
  async(req, (res) => {
    const { username, email, password, bio, profile_img } = req.body;

    const userExist = userModel.find({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    });
    if (userExist) {
      res.status(409).json({
        message:
          "User Aldready Exists" + userExist.email == email
            ? "Email Already Exist"
            : "Username Already Exist",
      });
    }
 const hash = crypto.createHash("sha256").update(password).digest("hex");
    const user =  userModel.create|(){
        username,
        email,
        bio,
        profile_img,
     password = hash,
    }

    const token = jwt.sign ({
        Id = user._id
    }, process.env.JWT_SECRET, {expiresIn: "1H"})
   
    res.cookie("token", token)
    res.status(201).json({
        message: "User Register Successully",
        user:{
            username:username,
            email: email, 
            bio: bio,
            profile_img: profile_img
        }


    })
  }),
  
);


module.exports = authRouter
