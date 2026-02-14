const { models } = require("mongoose");
const postModel = require("../models/postModel");
const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  private: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const token = req.cookies["register_token"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access - Token Required" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  res.send(file);
}

module.exports = {
  createPostController,
};
