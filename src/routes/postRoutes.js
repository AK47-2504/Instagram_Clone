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

module.exports = postRouter;
    