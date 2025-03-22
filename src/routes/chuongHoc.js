const express = require('express');
const router = express.Router();
const chuongHoc_Ctrl = require('../app/controllers/ChuongHoc_Ctrl');


router.post('/create-chuong-hoc', chuongHoc_Ctrl.create);

module.exports = router;

