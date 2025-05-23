const express = require("express");
const router = express.Router();
const momoController = require("../app/controllers/paymentMomo_Ctrl");
const hoaDonNap = require("../app/controllers/HoaDonNap");
const verifyToken = require("../app/middlewares/authMiddleware");

// Route khởi tạo thanh toán
router.post("/payment", verifyToken.cookieToken, momoController.createPayment);

// Route trả về sau khi thanh toán
router.get("/payment/return", momoController.handleReturnUrl);

// Route IPN nhận thông báo từ MoMo
router.post("/payment/ipn", momoController.handleIPN);

router.get("/api/invoices/by-user/:maNguoiDung", hoaDonNap.get_by_User);
router.get("/api/invoices/by-id/:maHoaDon", hoaDonNap.get_by_ID);


module.exports = router;