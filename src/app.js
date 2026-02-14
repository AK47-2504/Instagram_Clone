const cookieParser = require("cookie-parser");
const express = require("express");
const authRouter = require("../src/routes/authRoutes");
const postRouer = require("../src/routes/postRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});


app.use("/api/auth", authRouter);
app.use("/api/posts", postRouer);

module.exports = app;
