const express = require('express');
const router = express.Router();
const dangKyKhoaHoc_Ctrl = require('../app/controllers/DangKyKhoaHoc_Ctrl');

router.post("/courses/dang-ky", dangKyKhoaHoc_Ctrl.create);

module.exports = router;