const { json } = require('express');
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

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;

        // Lần đầu sẽ lấy ra tổng số trang
        const count = req.query.count === 'true'; 

        HoaDonNap.get_by_User(page, pageSize, count, maNguoiDung, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi lấy hóa đơn nạp!", error: err });
            }
    
            res.status(200).json(result);
        });
    }
}

module.exports = new Controller();
