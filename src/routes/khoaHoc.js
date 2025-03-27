const express = require('express');
const router = express.Router();
const khoaHoc_Ctrl = require('../app/controllers/KhoaHoc_Ctrl');

router.get('/get-all-khoahoc', khoaHoc_Ctrl.index);
router.post('/create-khoahoc', khoaHoc_Ctrl.create);
router.put('/:maKhoaHoc/update-khoahoc', khoaHoc_Ctrl.update);
router.delete('/:maKhoaHoc/delete-khoahoc', khoaHoc_Ctrl.delete);
router.get('/:tenKhoaHoc/search-khoahoc', khoaHoc_Ctrl.search);
router.get('/getByID/:maKhoaHoc', khoaHoc_Ctrl.getByID);
router.get('/selection-khoahoc', khoaHoc_Ctrl.selection);
router.get('/api/courses/count-student', khoaHoc_Ctrl.count_Student);
router.get('/api/courses/Revenue', khoaHoc_Ctrl.Revenue);
router.get('/api/courses/count-lesson-and-lecure/:maKhoaHoc', khoaHoc_Ctrl.countLes_Lec);



module.exports = router;