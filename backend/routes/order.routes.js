const express = require("express");
const {
  billingProcess,
  getUserOrder,
  getAOrder,
  getAllOrders,
  paymentIndegration,
} = require("../controllers/order.controllers");
const { protect, adminProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/",protect, billingProcess);
router.get("/",protect, getUserOrder);
router.get("/:id",protect, getAOrder);
router.get("/admin/orders",protect,adminProtect, getAllOrders);

module.exports = router;
