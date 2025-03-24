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
}

module.exports = new Controller();
