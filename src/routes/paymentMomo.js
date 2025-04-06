const express = require("express");
const router = express.Router();
const momoController = require("../app/controllers/paymentMomo_Ctrl");

// Route khởi tạo thanh toán
router.post("/payment", momoController.createPayment);

// Route trả về sau khi thanh toán
router.get("/payment/return", momoController.handleReturnUrl);

// Route IPN nhận thông báo từ MoMo
router.post("/payment/ipn", momoController.handleIPN);

module.exports = router;
