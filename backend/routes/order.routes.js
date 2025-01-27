const express = require("express");
const {
  billingProcess,
  getUserOrder,
  getAOrder,
  getAllOrders,
  paymentIndegration,
  makePayment,
  webhook,
  verifyPayment,
} = require("../controllers/order.controllers");
const { protect, adminProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/",protect, billingProcess);
router.get("/",protect, getUserOrder);
router.get("/:id",protect, getAOrder);
router.post("/payment",protect, makePayment);
router.get("/verify-payment/:sessionId",protect, verifyPayment);
// router.post("/webhook",webhook);
router.get("/admin/orders",protect,adminProtect, getAllOrders);

module.exports = router;
