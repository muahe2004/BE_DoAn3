const express = require('express');
const router = express.Router();
const dapAn_Ctrl = require('../app/controllers/DapAn_Ctrl');

router.get('/api/answers/:maCauHoi', dapAn_Ctrl.index);
router.post('/api/answers', dapAn_Ctrl.create);
router.put('/api/answers/:maDapAn', dapAn_Ctrl.update);
router.delete('/api/answers/:maDapAn', dapAn_Ctrl.delete);

module.exports = router;