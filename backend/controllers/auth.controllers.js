const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res) => {
  const { firstName,lastName, email, password , role } = req.body;
  console.log(req.body);
  try {
    const isUserExists = await User.findOne({ email: email });
    if (isUserExists) {
      return res
        .status(400)
        .json({
          message:
            "User is already exists, use another email address for registration",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "customer",
    });
    await user.save();

    
    const data = {
        user: {
          id: user._id,
        },
      };
      const token = jwt.sign(data, process.env.JWT_SKEY, { expiresIn: "1d" });
      res.json({ message: "Logged successful", token, user });
  } catch (error) {
    return res.status(500).json({ message: "Server error, please try again." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  try {
    const user = await User.findOne({ email });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password , try again!" });
    }

    const data = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(data, process.env.JWT_SKEY, { expiresIn: "1d" });
    res.json({ message: "Logged successful", token,user });
  } catch (err) {
    return res.status(500).json({ message: "Server error, please try again." });
  }
};

module.exports = {
  register,
  login,
};
