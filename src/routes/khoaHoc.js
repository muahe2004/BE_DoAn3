const express = require('express');
const router = express.Router();
const khoaHoc_Ctrl = require('../app/controllers/KhoaHoc_Ctrl');

router.get('/', khoaHoc_Ctrl.index);
router.post('/create-khoahoc', khoaHoc_Ctrl.create);
router.put('/:maKhoaHoc/update-khoahoc', khoaHoc_Ctrl.update);
router.delete('/:maKhoaHoc/delete-khoahoc', khoaHoc_Ctrl.delete);
router.get('/:tenKhoaHoc/search-khoahoc', khoaHoc_Ctrl.search);
router.get('/getByID/:maKhoaHoc', khoaHoc_Ctrl.getByID);


module.exports = router;