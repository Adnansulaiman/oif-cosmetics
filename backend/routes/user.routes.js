const express = require("express");
const upload = require('../uploads/multer.config')

const {
  getUserDetails,
  updateUserDetails,
  addAddress,
  updateAddress,
  deleteAddress,
  addToWishlist,
  viewWishlist,
  deleteWishlist,
  uploadUserImage,
  deleteUserImage,
  changePassword,
} = require("../controllers/user.controllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserDetails);
router.put("/", protect, updateUserDetails);
router.post("/add-address", protect, addAddress);
router.put("/update-address/:id", protect, updateAddress);
router.delete("/delete-address/:id", protect, deleteAddress);
router.post('/wishlist/:id',protect,addToWishlist)
router.get('/wishlist/',protect,viewWishlist)
router.delete('/wishlist/:id',protect,deleteWishlist)
router.put('/upload-image',protect,upload.single('profileImage'),uploadUserImage)
router.delete('/delete-image',protect,deleteUserImage);
router.put('/change-password',protect,changePassword);




module.exports = router;
