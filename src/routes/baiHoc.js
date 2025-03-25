const express = require('express');
const router = express.Router();
const baiHoc_Ctrl = require('../app/controllers/BaiHoc_Ctrl');


router.get('/listBaiHoc/:maChuongHoc', baiHoc_Ctrl.index);
router.post('/create-bai-hoc', baiHoc_Ctrl.create);
router.put('/update-bai-hoc/:maBaiHoc', baiHoc_Ctrl.update);
router.delete('/delete-bai-hoc/:maBaiHoc', baiHoc_Ctrl.delete);
router.get('/search-bai-hoc/:maBaiHoc', baiHoc_Ctrl.search_baiHoc);

module.exports = router;

