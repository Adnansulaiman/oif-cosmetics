const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const User = require("../models/User");
const Otp = require("../models/Otp");

// const Redis = require('ioredis');
// const { transporter } = require("../utils/nodemailer.config");

// Configure Redis
// const redis = new Redis(); // Connects to Redis running on localhost:6379 by default
//Configure nodemailer
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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

const SendOtpForgetPassowrd = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Generate a random OTP
  const otp = crypto.randomInt(100000, 999999);

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    // Save the OTP in Redis with a 10-minute expiration (600 seconds)
    // await redis.set(`otp:${email}`, otp, 'EX', 600);
    // Save OTP in MongoDB
    const otpRecord = new Otp({ email, otp });
    await otpRecord.save();


    console.log(`OTP sent to ${email}: ${otp}`); // Log OTP for debugging

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP', error });
  }
}
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'OTP is required' });
  }

  try {
    // Retrieve the OTP from MongoDB
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Delete the OTP after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP', error });
  }
}
const changePassword = async(req,res)=>{
  const {email,newPassword,confirmPassword} = req.body;
  try{
    const user = await User.findOne({email:email});
    if(!user){
      return res.status(404).json({message:"User not found!"})
    }
    if(newPassword !== confirmPassword) {
      return res.status(400).json({message:"Password is not same ,try again!"})
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({message:"Password successfully changed",user});
  }catch(err){
    console.error('Error while changing password', err);
    res.status(500).json({ message: 'Failed to Changing Password', err });
  }
}
module.exports = {
  register,
  login,
  SendOtpForgetPassowrd,
  verifyOtp,
  changePassword
};
