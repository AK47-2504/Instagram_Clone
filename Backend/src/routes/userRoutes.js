const express = require("express");
const {
  followUserController,
  unfollowUserController,
  updateFollowStatusController,
  getPendingFollowRequestsController,
} = require("../controllers/userController");
const identifyUser = require("../middlewares/authMiddleware");
const userRouter = express.Router();

userRouter.post("/follow/:username", identifyUser, followUserController);
userRouter.post("/unfollow/:username", identifyUser, unfollowUserController);

userRouter.post(
  "/follow/status/:requestId",
  identifyUser,
  updateFollowStatusController,
);

module.exports = userRouter;

/*
@route
@description
@access
*/
