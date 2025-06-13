const express = require('express');
const router = express.Router();
const baiViet_Ctrl = require('../app/controllers/BaiViet_Ctrl');

router.post('/api/articles', baiViet_Ctrl.create);
router.get('/api/articles/:maBaiViet', baiViet_Ctrl.get_byID);

module.exports = router;
