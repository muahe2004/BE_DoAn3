const express = require('express');
const router = express.Router();
const dangKyKhoaHoc_Ctrl = require('../app/controllers/DangKyKhoaHoc_Ctrl');

router.post("/api/courses/resgister", dangKyKhoaHoc_Ctrl.create);
router.get("/api/courses/registered/:maNguoiDung", dangKyKhoaHoc_Ctrl.get_By_UserID);
router.get("/api/courses/benefit/:distance", dangKyKhoaHoc_Ctrl.benefit);
router.get("/api/courses/most-courses", dangKyKhoaHoc_Ctrl.most);
router.get("/api/courses/sum-student", dangKyKhoaHoc_Ctrl.sumStudent);
router.get("/api/courses/sum-benefit", dangKyKhoaHoc_Ctrl.sumBenefit);

module.exports = router;