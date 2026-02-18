const followModel = require("../models/followModel");
const userModel = require("../models/userModel");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followingUsername = req.params.username;

  if (followerUsername === followingUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFollowingUserExist = await userModel.findOne({
    username: followingUsername,
  });
  if (!isFollowingUserExist) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followingUsername,
  });
  if (isAlreadyFollowing) {
    res.status(400).json({
      message: `You are Already following ${followingUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    following: followingUsername,
  });

  res.status(200).json({
    message: `You are Following ${followingUsername}`,
    followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followingUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followingUsername,
  });

  if (!isUserFollowing) {
    return res.status(400).json({
      message: `You are not following ${followingUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);
  
  res.status(200).json({
    message: `You have unfollowed ${followingUsername}`,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
};
