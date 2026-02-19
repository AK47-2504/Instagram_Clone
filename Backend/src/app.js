const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

const authRouter = require("../src/routes/authRoutes");
const postRouer = require("../src/routes/postRoutes");
const userRouter = require("../src/routes/userRoutes");

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouer);
app.use("/api/users/", userRouter);

module.exports = app;
