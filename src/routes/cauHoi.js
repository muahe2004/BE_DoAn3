const express = require('express');
const router = express.Router();
const cauHoi_Ctrl = require('../app/controllers/CauHoi_Ctrl');

router.get('/get-cau-hoi/:maBaiHoc', cauHoi_Ctrl.index);
router.post('/create-cau-hoi', cauHoi_Ctrl.create);
router.put('/update-cau-hoi/:maCauHoi', cauHoi_Ctrl.update);
router.delete('/delete-cau-hoi/:maCauHoi', cauHoi_Ctrl.delete);

module.exports = router;