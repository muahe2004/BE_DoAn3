const { response } = require('express');
const DapAn = require('../models/dapAn');

class Controller {
    index(req, res) {
        const maCauHoi = req.params.maCauHoi;

        if (!maCauHoi) {
            return res.status(400).json({message: "Chưa có mã câu hỏi!"});
        }

        DapAn.index(maCauHoi, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy đáp án!"});
            }
            return res.status(200).json(result);
        })
    }

    create(req, res) {
        const dataDapAn = req.body;

        if (!dataDapAn || Object.keys(dataDapAn).length === 0) {
            return res.status(400).json({message: 'Dữ liệu không lệ!'});
        }

        DapAn.create(dataDapAn, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({
                message: 'Thêm đáp án thành công!',
                data: {
                    id: result.insertId, ...dataDapAn
                },
            })
        })
    }

    update(req, res) {
        const maDapAn = req.params.maDapAn;
        const data_DapAn = req.body;
        
        if (!maDapAn) {
            return res.status(400).json({message: "Chưa có mã đáp án1"});
        }

        if (!data_DapAn || Object.keys(data_DapAn).length === 0) {
            return res.status(400).json({message: "Dữ liệu không hợp lệ!"});
        }

        DapAn.update(maDapAn, data_DapAn, (err, result) => {
            if (err) {
                return res.status(500).json({error: err});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({message: "Không tìm thấy đáp án!"})
            }

            return res.status(200).json({
                message: "Sửa đáp án thành công!",
                data: {
                    id: result.insertId, ...data_DapAn,
                }
            })
        })
    }

    delete(req, res) {
        const maDapAn = req.params.maDapAn;

        if (!maDapAn) {
            return res.status(400).json({error: "Thiếu mã đáp án!"});
        }

        DapAn.delete(maDapAn, (err, result) => {
            if (err) {
                return res.status(500).json({error: "Lỗi khi xóa đáp án!"});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({error: "Không tìm thấy đáp án để xóa1"});
            }

            return res.status(200).json({message: "Đã xóa đáp án thành công!"});
        })
    }
}

module.exports = new Controller;