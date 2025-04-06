const { json } = require('express');
const KhoaHoc = require('../models/khoaHoc'); // Import model

class Controller {
    index(req, res) {
        KhoaHoc.getAll_KhoaHoc((err, danhSachKhoaHoc) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi khi lấy danh sách khóa học.', error: err });
            }
            res.status(200).json(danhSachKhoaHoc);
        });
    }

    home_feeCourses(req, res) {
        KhoaHoc.home_feeCourses((err, result) => {
            if (err) {
                return res.status(500),json({message: "LỖi khi lấy 4 khóa học có phí!", error: err});
            }
            res.status(200).json(result);
        })
    }

    home_no_feeCourses(req, res) {
        KhoaHoc.home_no_feeCourses((err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy 4 khóa học miễn phí!", error: err});
            }
            res.status(200).json(result);
        })
    }

    create(req, res, next) {
        const newKhoaHoc = req.body; 
        
        if (!newKhoaHoc || Object.keys(newKhoaHoc).length === 0) {
            return res.status(400).json({ message: "Dữ liệu không hợp lệ!", error: error});
        }

        KhoaHoc.create_KhoaHoc(newKhoaHoc, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi thêm khóa học!", error: err });
            }
            res.status(201).json({
                message: "Thêm khóa học thành công!",
                data: { id: result.insertId, ...newKhoaHoc }, 
            });
        });
    }

    update(req, res, next) {
        const maKhoaHoc = req.params.maKhoaHoc;
        const updatedData = req.body; 
    
        if (!maKhoaHoc) {
            return res.status(400).json({ message: "Thiếu mã khóa học!" });
        }
    
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ message: "Dữ liệu cập nhật không hợp lệ!" });
        }
    
        KhoaHoc.update_KhoaHoc(maKhoaHoc, updatedData, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi sửa khóa học!", error: err });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Không tìm thấy khóa học để cập nhật!" });
            }

            res.status(200).json({
                message: "Sửa khóa học thành công!",
                data: { maKhoaHoc, ...updatedData },
            });
        });
    }
    
    delete(req, res, next) {
        const maKhoaHoc = req.params.maKhoaHoc; 
    
        KhoaHoc.delete_KhoaHoc(maKhoaHoc, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi xóa khóa học!", error: err });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Không tìm thấy khóa học để xóa!" });
            }
    
            res.status(200).json({ message: "Đã xóa khóa học thành công!" });
        });
    }

    search(req, res, next) {
        const tenKhoaHoc = req.params.tenKhoaHoc;

        KhoaHoc.search_KhoaHoc(tenKhoaHoc, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi tìm kiếm khóa học!", error: err});
            }
            res.status(200).json(result);
        })
    }

    getByID(req, res, next) {
        const maKhoaHoc = req.params.maKhoaHoc;
    
        KhoaHoc.get_course_byID(maKhoaHoc, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi lấy thông tin khóa học!", error: err });
            }
            if (result.length > 0) {
                res.status(200).json(result[0]); // ⚡ Chỉ trả về object thay vì mảng
            } else {
                res.status(404).json({ message: "Không tìm thấy khóa học" });
            }
        });
    }
    
    selection(req, res, next) {
        KhoaHoc.selection_KhoaHoc((err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy thông tin khóa học!", error: err});
            }
            res.status(200).json(result);
        })
    }

    count_Student(req, res) {
        KhoaHoc.count_Student((err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi thống kê số lượng học viên!", error: err});
            }
            res.status(200).json(result);
        })
    }

    Revenue(req, res) {
        KhoaHoc.Revenue((err, result) => {
            if(err) {
                return res.status(500).json({message: "Lỗi khi thống kê doanh thu khóa học!", error: err});
            }
            res.status(200).json(result);
        })
    }

    countLes_Lec(req, res) {
        const maKhoaHoc = req.params.maKhoaHoc;

        if (!maKhoaHoc) {
            return res.status(400).json({message: "Chưa có mã khóa học!"});
        }

        KhoaHoc.count_Les_Lec(maKhoaHoc, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi thống kê chương, bài học của khóa học!", error: err});
            }
            res.status(200).json(result);
        })
    }

    countFree(req, res) {
        KhoaHoc.countFree((err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi thống kê"});
            }
            res.status(200).json(result);
        })
    }

    countVip(req, res) {
        KhoaHoc.countVip((err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi thống kê"});
            }
            res.status(200).json(result);
        })
    }
}

module.exports = new Controller();
