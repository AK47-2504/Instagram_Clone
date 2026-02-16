const { models } = require("mongoose");
const postModel = require("../models/postModel");
const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  private: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access - Token Required" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access - Invalid Token" });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Instagram_Clone_Posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    img_url: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });
}

async function getPostsController(req, res) {
  const token = req.cookies.token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access - Invalid Token" });
  }

  const userId = decoded.id;

  const posts = await postModel.find({ user: userId });
  res.status(200).json({
    message: "Posts Fetched Successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access - Token Required" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access - Invalid Token" });
  }

  const userId = decoded.id;
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

module.exports = {
  createPostController,
  getPostsController,
  getPostDetailsController,
};
