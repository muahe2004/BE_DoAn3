const express = require('express');
const router = express.Router();
const dapAn_Ctrl = require('../app/controllers/DapAn_Ctrl');

router.get('/get-dap-an/:maCauHoi', dapAn_Ctrl.index);
router.post('/add-dap-an', dapAn_Ctrl.create);
router.put('/update-dap-an/:maDapAn', dapAn_Ctrl.update);
router.delete('/delete-dap-an/:maDapAn', dapAn_Ctrl.delete);

module.exports = router;