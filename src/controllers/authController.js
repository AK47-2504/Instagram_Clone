const userModel = require("../models/userModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profile_img } = req.body;

  const userExist = userModel.find({
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
    res.status(409).json({
      message:
        "User Aldready Exists" + userExist.email == email
          ? "Email Already Exist"
          : "Username Already Exist",
    });
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = userModel.create({
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

  res.cookie("token", token);
  res.status(201).json({
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
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      message: "Credentials required",
    });
  }

  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    res.status(404).json({
      message: "User Not Found",
    });
  }

  const validUser =
    crypto.createHash("sha256").update(password).digest("hex") ===
    user.password;
  if (!validUser) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1H" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "Login Successful",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_img: user.profile_img,
    },
  });
}

module.exports = { registerController, loginController };
