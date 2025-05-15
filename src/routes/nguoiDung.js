const express = require('express');
const router = express.Router();
const nguoiDung_Ctrl = require('../app/controllers/NguoiDung_Ctrl');

router.get('/api/users', nguoiDung_Ctrl.index);
router.post('/api/users', nguoiDung_Ctrl.create);
router.put('/api/:maNguoiDung', nguoiDung_Ctrl.update);
router.delete('/api/:maNguoiDung', nguoiDung_Ctrl.delete);
router.get('/api/search-nguoi-dung/:input', nguoiDung_Ctrl.search);
router.get('/api/users/:email', nguoiDung_Ctrl.findByEmail);

module.exports = router;