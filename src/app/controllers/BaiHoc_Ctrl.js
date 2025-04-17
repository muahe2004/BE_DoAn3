const { response } = require('express');
const BaiHoc = require('../models/baiHoc'); 

class Controller {
    index(req, res) {
        const maChuongHoc = req.params.maChuongHoc;
        BaiHoc.getAll_BaiHoc(maChuongHoc, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi khi lấy danh sách bài học.', error: err });
            }
            res.status(200).json(results);
        });
    }

    create(req, res, next) {
        const newBaiHoc = req.body; 
        
        if (!newBaiHoc || Object.keys(newBaiHoc).length === 0) {
            return res.status(400).json({ message: "Dữ liệu không hợp lệ!" });
        }

        BaiHoc.create_BaiHoc(newBaiHoc, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi thêm bài học!", error: err });
            }
            res.status(201).json({
                message: "Thêm bài học thành công!",
                data: { id: result.insertId, ...newBaiHoc }, 
            });
        });
    }

    update (req, res, next) {
        const maBaiHoc =  req.params.maBaiHoc;
        const updateData = req.body;

        if (!maBaiHoc) {
            return res.status(400).json({ message: "Thiếu mã bài học"});
        }

        if (!updateData) {
            return res.status(400).json({ message: "Dữ liệu không hợp lệ!"});
        }

        BaiHoc.update_BaiHoc(maBaiHoc, updateData, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khí sửa bài học!"});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Không tìm thấy bài học để cập nhật!"});
            }

            res.status(200).json({
                message: "Sửa bài học thành công!",
                data: {maBaiHoc, ...updateData},
            });
        })
    }

    delete(req, res, next) {
        const maBaiHoc = req.params.maBaiHoc;

        if (!maBaiHoc) {
            return res.status(400).json({message: "Thiếu mã bài học!"});
        }

        BaiHoc.delete_BaiHoc(maBaiHoc, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi xóa bài học!"});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({message: "Không tìm thấy bài học để xóa!"});
            }

            res.status(200).json({message: "Đã xóa bài học thành công!"});
        })
    }

    search_baiHoc(req, res) {
        const maBaiHoc = req.params.maBaiHoc;

        if (!maBaiHoc) {
            return res.status(400).json({message: "Thiếu mã bài học!"});
        }

        BaiHoc.search(maBaiHoc, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy thông tin bài học!"});
            }
            res.status(200).json(result);
        })
    }

    get_first_lecture(req, res) {
        const maKhoaHoc = req.params.maKhoaHoc;

        if (!maKhoaHoc) {
            return res.status(400).json({message: "Chưa có mã khóa học!"});
        }

        BaiHoc.get_first_lecture(maKhoaHoc, (err, result) => {
            if (err) {
                return res.status(500).json({Lỗi: "Lỗi: ", err});
            }
            res.status(200).json(result[0]);
        })
    }
    
    get_Learning_Lecture(req, res) {
        const {maChuongHoc, maNguoiDung} = req.body;

        if (!maChuongHoc || !maNguoiDung) {
            return res.status(400).json({ message: "Thiếu mã bài học hoặc mã người dùng!" });
        }

        const info = [maChuongHoc, maNguoiDung];

        BaiHoc.get_Learning_Lecture(info, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy các bài học!", err: err});
            }
            res.status(200).json(result);
        })
    }

    set_Learned(req, res) {
        const { maBaiHoc, maNguoiDung } = req.body;

        if (!maBaiHoc || !maNguoiDung) {
            return res.status(400).json({ message: "Thiếu mã bài học hoặc mã người dùng!" });
        }

        const info = [maBaiHoc, maNguoiDung];

        BaiHoc.set_Learned(info, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi cập nhật tiến độ.", err });
            }
            res.status(200).json({ message: "Cập nhật tiến độ thành công!" });
        });
    }

    insert_TienDo(req, res) {
        const { maNguoiDung, baiHocList } = req.body;

        // Kiểm tra dữ liệu
        if (!maNguoiDung || !Array.isArray(baiHocList) || baiHocList.length === 0) {
            return res.status(400).json({ message: "Dữ liệu không hợp lệ!" });
        }

        // Gọi model để insert tiến độ
        BaiHoc.insert_TienDo({ maNguoiDung, baiHocList }, (err, result) => {
            if (err) {
                console.error("Lỗi khi thêm tiến độ:", err);
                return res.status(500).json({ message: "Lỗi server khi thêm tiến độ!" });
            }

            res.status(201).json({ message: "Thêm tiến độ học thành công!", data: result });
        });
    }

}

module.exports = new Controller();
