const { response } = require('express');
const BaiViet = require('../models/baiViet'); 
const axios = require('axios');
require('dotenv').config();

class Controller {
    create(req, res, next) {
        const newBaiViet = req.body; 
        
        if (!newBaiViet || Object.keys(newBaiViet).length === 0) {
            return res.status(400).json({ message: "Dữ liệu không hợp lệ!" });
        }

        BaiViet.create_BaiViet(newBaiViet, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi thêm bài viết!", error: err });
            }
            res.status(201).json({
                message: "Thêm bài viết thành công!",
                data: { id: result.insertId, ...newBaiViet }, 
            });
        });
    }

    get_byID(req, res, next) {
        const maBaiViet = req.params.maBaiViet;

        if (!maBaiViet) {
            return res.status(400).json({ message: "Chưa có mã bài viết!" });
        }

        BaiViet.get_byID(maBaiViet, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi lấy bài viết!", error: err });
            }
            res.status(200).json({ result });
        })
    }
}

module.exports = new Controller();
