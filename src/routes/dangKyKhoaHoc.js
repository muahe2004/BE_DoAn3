const express = require('express');
const router = express.Router();
const dangKyKhoaHoc_Ctrl = require('../app/controllers/DangKyKhoaHoc_Ctrl');

router.post("/api/register-courses", dangKyKhoaHoc_Ctrl.create);
router.get("/api/courses/registered/:maNguoiDung", dangKyKhoaHoc_Ctrl.get_By_UserID);
router.get("/api/analysis-courses/benefit/:distance", dangKyKhoaHoc_Ctrl.benefit);
router.get("/api/analysis-courses/most-courses", dangKyKhoaHoc_Ctrl.most);
router.get("/api/analysis-courses/sum-student", dangKyKhoaHoc_Ctrl.sumStudent);
router.get("/api/analysis-courses/sum-benefit", dangKyKhoaHoc_Ctrl.sumBenefit);
router.get("/api/courses/check-student/:maKhoaHoc", dangKyKhoaHoc_Ctrl.checkStudent);
router.get("/api/courses/count-student/:check", dangKyKhoaHoc_Ctrl.count_Student);
router.get("/api/count-courses-of-student", dangKyKhoaHoc_Ctrl.courseCountByUser);

module.exports = router;