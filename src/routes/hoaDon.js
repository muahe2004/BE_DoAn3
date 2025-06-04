const express = require("express");
const router = express.Router();
const hoaDon = require("../app/controllers/HoaDon");

router.post("/api/bills", hoaDon.create);
router.get("/api/bills/by-users/:maNguoiDung", hoaDon.get_by_User);
router.get("/api/bills/by-id/:maHoaDon", hoaDon.get_by_ID);
router.get("/api/bills/benefit/:distance", hoaDon.benefit);

module.exports = router;