const { json } = require('express');
const KhoaHoc = require('../models/khoaHoc'); // Import model
const HoaDonNap = require('../models/hoaDonNap');

class Controller {
    get_by_ID(req, res) {
        const maHoaDon = req.params.maHoaDon;

        HoaDonNap.get_by_ID(maHoaDon, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi lấy hóa đơn nạp!", error: err });
            }
    
            res.status(200).json(result);
        });
    }

    get_by_User(req, res) {
        const maNguoiDung = req.params.maNguoiDung;

        HoaDonNap.get_by_User(maNguoiDung, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi lấy hóa đơn nạp!", error: err });
            }
    
            res.status(200).json(result);
        });
    }
}

module.exports = new Controller();
