const express = require("express");
const {
  followUserController,
  unfollowUserController,
} = require("../controllers/userController");
const identifyUser = require("../middlewares/authMiddleware");
const userRouter = express.Router();

userRouter.post("/follow/:username", identifyUser, followUserController);
userRouter.post("/unfollow/:username", identifyUser, unfollowUserController);

module.exports = userRouter;

/*
@route
@description
@access
*/
