const { models } = require("mongoose");
const postModel = require("../models/postModel");
const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/likeModel");

const imagekit = new ImageKit({
  private: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Instagram_Clone_Posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    img_url: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });
}

async function getPostsController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({ user: userId });
  res.status(200).json({
    message: "Posts Fetched Successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postid;
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
  }

  const validUser = post.user.toString() === userId;
  if (!validUser) {
    return res.status(403).json({ message: "Forbidden - Access Denied" });
  }

  res.status(200).json({
    message: "Post Details Fetched Successfully",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postid;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post Liked Successfully",
    like,
  });
}

module.exports = {
  createPostController,
  getPostsController,
  getPostDetailsController,
  likePostController,
};
