const express = require('express');
const router = express.Router();
const dangKyKhoaHoc_Ctrl = require('../app/controllers/DangKyKhoaHoc_Ctrl');

router.post("/courses/resgister", dangKyKhoaHoc_Ctrl.create);
router.get("/courses/registered/:maNguoiDung", dangKyKhoaHoc_Ctrl.get_By_UserID);


module.exports = router;