const express = require("express");
const authRouters = require("../controllers/authController");
const identifyUser = require("../middlewares/authMiddleware");

const authRouter = express.Router();

// api/auth/register
authRouter.post("/register", authRouters.registerController);

// api/auth/login
authRouter.post("/login", authRouters.loginController);

// api/auth/get-me
authRouter.get("/get-me", identifyUser, authRouters.getMeController);

module.exports = authRouter;
