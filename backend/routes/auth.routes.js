const express = require('express');
const {register,login, SendOtpForgetPassowrd, verifyOtp, changePassword} = require('../controllers/auth.controllers')
const router = express.Router();
const {protect,adminProtect} = require('../middlewares/authMiddleware');

router.post('/register',register)
router.post('/login',login)
router.post('/send-otp',SendOtpForgetPassowrd);
router.post('/verify-otp',verifyOtp);
router.post('/change-password',changePassword);



module.exports = router;