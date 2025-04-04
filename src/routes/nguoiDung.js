const express = require('express');
const router = express.Router();
const nguoiDung_Ctrl = require('../app/controllers/NguoiDung_Ctrl');

router.get('/get-nguoi-dung', nguoiDung_Ctrl.index);
router.post('/users', nguoiDung_Ctrl.create);
router.put('/update-nguoi-dung/:maNguoiDung', nguoiDung_Ctrl.update);
router.delete('/delete-nguoi-dung/:maNguoiDung', nguoiDung_Ctrl.delete);
router.get('/search-nguoi-dung/:input', nguoiDung_Ctrl.search);
router.get('/users/:email', nguoiDung_Ctrl.findByEmail);

module.exports = router;