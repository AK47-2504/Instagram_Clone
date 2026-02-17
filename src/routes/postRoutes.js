const express = require("express");
const postRouter = express.Router();

const {
  getPostDetailsController,
  getPostsController,
  createPostController,
} = require("../controllers/postController");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/authMiddleware");

postRouter.post("/", identifyUser, upload.single("image"), createPostController);

postRouter.get("/", identifyUser, getPostsController);

postRouter.get("/details/:postid", identifyUser, getPostDetailsController);

module.exports = postRouter;
