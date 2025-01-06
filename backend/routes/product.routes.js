const express = require("express");

const upload = require('../uploads/multer.config')

const {
  getAllProducts,
  addProduct,
  getAProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controllers");
const { protect, adminProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.post("/", protect, adminProtect, addProduct);
router.put("/:id", protect, adminProtect,upload.array('photos',4), updateProduct);
router.delete("/:id", protect, adminProtect, deleteProduct);

module.exports = router;

