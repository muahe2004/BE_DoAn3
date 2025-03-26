const { response } = require('express');
const DangKyKhoaHoc = require("../models/dangKyKhoaHoc"); 

class Controller {
    create (req, res) {
        const dataKhoaHoc = req.body;

        if (!dataKhoaHoc) {
            return res.status(400).json("Dữ liệu không hợp lệ!");
        }

        DangKyKhoaHoc.create(dataKhoaHoc, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json({
                message: 'Đăng ký khóa học thành công!',
                data: {
                    id: result.insertId, ...dataKhoaHoc
                },
            });
        })
    }
}

module.exports = new Controller;