const { response } = require('express');
const NguoiDung = require('../models/nguoiDung');
const authMiddleware = require('../middlewares/authMiddleware'); 
const bcrypt = require('bcryptjs');


class Controller {
    index(req, res) {
        authMiddleware(req, res, () => {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Bạn không có quyền truy cập!' });
            }
    
            NguoiDung.index((err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Lỗi khi lấy người dùng!" });
                }
                return res.status(200).json(result);
            });
        });
    }


    create(req, res) {
        const data_NguoiDung = req.body;

        if (!data_NguoiDung || Object.keys(data_NguoiDung).length === 0) {
            return res.status(400).json({ message: 'Dữ liệu không hợp lệ!' });
        }

        const { email, matKhau, loaiNguoiDung } = data_NguoiDung;

        // 🔥 Kiểm tra username đã tồn tại chưa
        NguoiDung.findByUsername(email, async (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi server', error: err });
            }
            if (user.length > 0) {
                return res.status(400).json({ message: 'Tên tài khoản đã tồn tại!' });
            }

            try {
                const hashedPassword = await bcrypt.hash(matKhau, 10);
                const newUser = { ...data_NguoiDung, matKhau: hashedPassword, loaiNguoiDung: loaiNguoiDung || 'Học viên' };

                NguoiDung.create(newUser, (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Lỗi khi thêm người dùng', error: err });
                    }
                    return res.status(200).json({
                        message: 'Thêm người dùng thành công!',
                        data: { id: result.insertId, email, role: newUser.role },
                    });
                });
            } catch (error) {
                return res.status(500).json({ message: 'Lỗi khi mã hóa mật khẩu', error });
            }
        });
    }


    update(req, res) {
        const maNguoiDung = req.params.maNguoiDung;
        const data_NguoiDung = req.body;
        
        if (!maNguoiDung) {
            return res.status(400).json({message: "Chưa có mã người dùng"});
        }

        if (!data_NguoiDung || Object.keys(data_NguoiDung).length === 0) {
            return res.status(400).json({message: "Dữ liệu không hợp lệ!"});
        }

        NguoiDung.update(maNguoiDung, data_NguoiDung, (err, result) => {
            if (err) {
                return res.status(500).json({error: err});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({message: "Không tìm thấy người dùng!"})
            }

            return res.status(200).json({
                message: "Sửa thông tin người dùng thành công!",
                data: {
                    id: result.insertId, ...data_NguoiDung,
                }
            })
        })
    }

    delete(req, res) {
        const maNguoiDung = req.params.maNguoiDung;

        if (!maNguoiDung) {
            return res.status(400).json({error: "Thiếu mã người dùng!"});
        }

        NguoiDung.delete(maNguoiDung, (err, result) => {
            if (err) {
                return res.status(500).json({error: "Lỗi khi xóa người dùng!"});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({error: "Không tìm thấy người dùng để xóa1"});
            }

            return res.status(200).json({message: "Đã xóa người dùng thành công!"});
        })
    }

    search(req, res) {
        const input = req.params.input;

        if (!input) {
            return res.status(400).json({error: "Chưa nhập thông tin!"});
        }

        NguoiDung.search(input, (err, result) => {
            if (err) {
                return res.status(500).json({error: err});
            }

            return res.status(200).json({message: "Thông tin người dùng: ", data: result});
        })
    }

    findByEmail(req, res) {
        const email = req.params.email;

        if (!email) {
            return res.status(400).json({err: "Chưa có email!"});
        }

        NguoiDung.findByEmail(email, (err, result) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            res.status(200).json(result[0]);
        })
    }
}

module.exports = new Controller;