const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profile_img } = req.body;

  const userExist = await userModel.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });
  if (userExist) {
    return res.status(409).json({
      message: "User Already Exists",
    });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    bio,
    profile_img,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1H" },
  );

  res.cookie("register_token", token, {
    httpOnly: true,
  });
  return res.status(201).json({
    message: "User Register Successully",
    user: {
      username: username,
      email: email,
      bio: bio,
      profile_img: profile_img,
    },
  });
}

async function loginController(req, res) {
  try {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("login_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      message: "Login Successful",
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


module.exports = { registerController, loginController };
