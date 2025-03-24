const express = require('express');
const router = express.Router();
const chuongHoc_Ctrl = require('../app/controllers/ChuongHoc_Ctrl');


router.post('/create-chuong-hoc', chuongHoc_Ctrl.create);
router.get('/selection-chuong-hoc/:maKhoaHoc', chuongHoc_Ctrl.selection);
router.get('/lesson-details/:maChuongHoc', chuongHoc_Ctrl.lessonDetails);
router.put('/update-lesson/:maChuongHoc', chuongHoc_Ctrl.update);
router.delete('/delete-lesson/:maChuongHoc', chuongHoc_Ctrl.delete);

module.exports = router;

