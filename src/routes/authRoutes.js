const express = require("express");
const { registerController, loginController} = require("../controllers/authController");

const authRouter = express.Router();

// api/auth/register
authRouter.post("/register", registerController);

// api/auth/login
authRouter.post("/login", loginController);

module.exports = authRouter;
