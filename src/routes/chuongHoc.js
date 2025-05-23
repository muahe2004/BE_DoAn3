const express = require('express');
const router = express.Router();
const chuongHoc_Ctrl = require('../app/controllers/ChuongHoc_Ctrl');


router.post('/api/lessons', chuongHoc_Ctrl.create);
router.get('/api/lessons/selection-lessons/:maKhoaHoc', chuongHoc_Ctrl.selection);
router.get('/api/lessons/:maChuongHoc', chuongHoc_Ctrl.lessonDetails);
router.put('/api/lessons/:maChuongHoc', chuongHoc_Ctrl.update);
router.delete('/api/lessons/:maChuongHoc', chuongHoc_Ctrl.delete);
router.get('/api/selection-lessons-byLecture/:maBaiHoc', chuongHoc_Ctrl.selection_byLecture);

module.exports = router;

