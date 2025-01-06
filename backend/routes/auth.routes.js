const express = require('express');
const {register,login} = require('../controllers/auth.controllers')
const router = express.Router();
const {protect,adminProtect} = require('../middlewares/authMiddleware')

router.post('/register',register)
router.post('/login',login)


module.exports = router;