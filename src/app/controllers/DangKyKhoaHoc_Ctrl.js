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
                console.error("Lỗi MySQL:", err);
                return res.status(500).json({ error: "Lỗi server!", details: err });
            }
    
            console.log("Kết quả:", result);
            res.status(200).json({
                message: 'Đăng ký khóa học thành công!',
                data: result, // Trả về thông tin kết quả
            });
        });
    }

    get_By_UserID(req, res) {
        const maNguoiDung = req.params.maNguoiDung;

        if (!maNguoiDung) {
            return res.status(400).json({message: "Chưa có mã người dùng!"});
        }

        DangKyKhoaHoc.get_By_UserID(maNguoiDung, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy thông tin các khóa học của người dùng", error: err})
            }
            res.status(200).json(result);
        })
    }
    
}

module.exports = new Controller;