const express = require("express");
const authRouters = require("../controllers/authController");

const authRouter = express.Router();

// api/auth/register
authRouter.post("/register", authRouters.registerController);

// api/auth/login
authRouter.post("/login", authRouters.loginController);

module.exports = authRouter;
