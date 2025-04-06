const express = require('express');
const router = express.Router();
const dangKyKhoaHoc_Ctrl = require('../app/controllers/DangKyKhoaHoc_Ctrl');

router.post("/courses/resgister", dangKyKhoaHoc_Ctrl.create);
router.get("/courses/registered/:maNguoiDung", dangKyKhoaHoc_Ctrl.get_By_UserID);
router.get("/courses/benefit/:distance", dangKyKhoaHoc_Ctrl.benefit);
router.get("/courses/most", dangKyKhoaHoc_Ctrl.most);
router.get("/courses/sum-student", dangKyKhoaHoc_Ctrl.sumStudent);
router.get("/courses/sum-benefit", dangKyKhoaHoc_Ctrl.sumBenefit);

module.exports = router;