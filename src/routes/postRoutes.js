const express = require("express");
const postRouter = express.Router();
const postControllers = require("../controllers/postController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/* /api/posts/ -- Protected Routes Only Particular User can access 
    req.body = caption, image_url
*/
postRouter.post(
  "/",
  upload.single("image"),
  postControllers.createPostController,
);

// /api/posts/ -- Protected Routes Only Particular User can access - Getting all Posts Created by User
postRouter.get("/", postControllers.getPostsController);

// /api/posts/details/:postid -- Protected Routes Only Particular User can access - Getting Post Details of Particular Post of particular User

postRouter.get("/details/:postid", postControllers.getPostDetailsController);

module.exports = postRouter;
