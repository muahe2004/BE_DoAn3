const express = require('express');
const router = express.Router();
const baiHoc_Ctrl = require('../app/controllers/BaiHoc_Ctrl');

router.get('/api/lectures/by-lesson/:maChuongHoc', baiHoc_Ctrl.index);
router.post('/api/lectures', baiHoc_Ctrl.create);
router.put('/api/lectures/:maBaiHoc', baiHoc_Ctrl.update);
router.delete('/api/lectures/:maBaiHoc', baiHoc_Ctrl.delete);
router.get('/api/lectures/:maBaiHoc', baiHoc_Ctrl.search_baiHoc);
router.get('/api/lectures/get-first-lecture/:maKhoaHoc', baiHoc_Ctrl.get_first_lecture);
router.post('/api/get-learning-lectures', baiHoc_Ctrl.get_Learning_Lecture);
router.put('/api/set-learned', baiHoc_Ctrl.set_Learned);
router.post('/api/insert-progress', baiHoc_Ctrl.insert_TienDo);
router.get('/api/youtube/duration/:videoId', baiHoc_Ctrl.get_Video_Info);

module.exports = router;
