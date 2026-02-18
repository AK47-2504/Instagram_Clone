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

  const existingFollow = await followModel.findOne({
    follower: followerUsername,
    following: followingUsername,
  });

  if (existingFollow) {
    if (existingFollow.status === "accepted") {
      return res.status(400).json({
        message: `You are already following ${followingUsername}`,
      });
    } else if (existingFollow.status === "pending") {
      return res.status(400).json({
        message: `Follow request already sent to ${followingUsername}`,
      });
    } else if (existingFollow.status === "rejected") {
      // Allow resending by updating status to pending
      await followModel.findByIdAndUpdate(existingFollow._id, {
        status: "pending",
      });
      return res.status(200).json({
        message: `Follow request sent again to ${followingUsername}`,
      });
    }
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    following: followingUsername,
  });

  res.status(200).json({
    message: `Follow request sent to ${followingUsername}`,
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

  if (!isUserFollowing || isUserFollowing.status !== "accepted") {
    return res.status(400).json({
      message: `You are not following ${followingUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followingUsername}`,
  });
}

async function updateFollowStatusController(req, res) {
  const requestId = req.params.requestId;
  const status = req.body.status;
  const userId = req.user.id;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Must be 'accepted' or 'rejected'",
    });
  }

  const followRequest = await followModel.findById(requestId);

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  if (followRequest.status !== "pending") {
    return res.status(400).json({
      message: `Follow request is not pending Your request is already ${followRequest.status}`,
    });
  }

  const isUserAuthorized = await userModel.findOne({
    _id: userId,
    username: followRequest.following,
  });

  if (!isUserAuthorized) {
    return res.status(403).json({
      message: "You are not authorized to perform this action",
    });
  }

  const updatedFollowRequest = await followModel.findByIdAndUpdate(
    requestId,
    { status },
    { new: true },
  );

  res.status(200).json({
    message: `Follow request has been ${status}`,
    updatedFollowRequest,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  updateFollowStatusController,
};
