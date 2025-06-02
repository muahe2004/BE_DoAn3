const { response } = require('express');
const CauHoi = require('../models/cauHoi'); 

class Controller {
    index(req, res) {
        const maBaiHoc = req.params.maBaiHoc;
        CauHoi.index(maBaiHoc, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy danh sách câu hỏi", error: err});
            }
            res.status(200).json(result);
        })
    }

    get_byID(req, res) {
        const maCauHoi = req.params.maCauHoi;

        if (!maCauHoi) {
            return res.status(400).json({ message: "Chưa có mã câu hỏi!" });
        }

        CauHoi.get_CauHoi_byID(maCauHoi, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy thông tin câu hỏi", error: err});
            }
            res.status(200).json(result[0]);
        })
    }

    create(req, res) {
        const data_CauHoi = req.body;
    
        if (!data_CauHoi || Object.keys(data_CauHoi).length === 0) {
            return res.status(400).json({ message: "Dữ liệu không hợp lệ!" });
        }
    
        CauHoi.create_CauHoi(data_CauHoi, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi thêm câu hỏi!", error: err });
            }
    
            // Trả về mã câu hỏi đã thêm (maCauHoi)
            res.status(200).json({
                maCauHoi: data_CauHoi.maCauHoi, 
                ...data_CauHoi
            });
        });
    }
    
    update(req, res, next) {
        const maCauHoi = req.params.maCauHoi;
        const data_CauHoi = req.body;

        if (!maCauHoi) {
            return res.status(400).json({message: "Thiếu mã câu hỏi!"});
        }

        if (!data_CauHoi) {
            return res.status(400).json({message: "Dữ liệu không hợp lệ!"});
        }

        CauHoi.update_CauHoi(maCauHoi, data_CauHoi, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi sửa câu hỏi!"});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({message: "Không tìm câu hỏi!"})
            }

            res.status(200).json({
                message: "Sửa câu hỏi thành công!",
                data: {id: result.insertId, ...data_CauHoi}
            })
        })
    }

    delete(req, res, next) {
        const maCauHoi = req.params.maCauHoi;

        if (!maCauHoi) {
            return res.status(400).json({message: "Thiếu mã câu hỏi!"});
        }

        CauHoi.delete_CauHoi(maCauHoi, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi xóa câu hỏi!"});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({message: "Không tìm thấy câu hỏi để xóa!"});
            }

            res.status(200).json({message: "Xóa câu hỏi thành công!"});
        })
    }
}

module.exports = new Controller();