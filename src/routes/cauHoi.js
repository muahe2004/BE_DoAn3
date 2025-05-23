const express = require('express');
const router = express.Router();
const cauHoi_Ctrl = require('../app/controllers/CauHoi_Ctrl');

router.get('/api/questions/:maBaiHoc', cauHoi_Ctrl.index);
router.get('/api/questions/by-id/:maCauHoi', cauHoi_Ctrl.get_byID);
router.post('/api/questions', cauHoi_Ctrl.create);
router.put('/api/questions/:maCauHoi', cauHoi_Ctrl.update);
router.delete('/api/questions/:maCauHoi', cauHoi_Ctrl.delete);

module.exports = router;