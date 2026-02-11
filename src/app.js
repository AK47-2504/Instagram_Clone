const cookieParser = require("cookie-parser");
const express = require("express");
const authRouter = require("../src/routes/authRoutes");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

module.exports = app;
