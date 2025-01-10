const express = require("express");
const {
  addToCart,
  getCart,
  resetCart,
  removeAProductInCart,
  incrementCartQuantity,
  decrementCartQuantity,
} = require("../controllers/cart.controllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/addcart", protect, addToCart);
router.get("/getcart", protect, getCart);
router.delete("/resetcart", protect, resetCart);
router.delete("/removecart/:id", protect, removeAProductInCart);
router.put("/incrementcart/:id", protect, incrementCartQuantity);
router.put("/decrementcart/:id", protect, decrementCartQuantity);

module.exports = router;
