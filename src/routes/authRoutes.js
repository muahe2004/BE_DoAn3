const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const NguoiDung = require('../app/models/nguoiDung');
require('dotenv').config();

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, matKhau } = req.body;

    NguoiDung.findByUsername(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi server' });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu' });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(matKhau, user.matKhau);
        if (!isMatch) {
            return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu' });
        }

        const token = jwt.sign(
            { id: user.maNguoiDung, email: user.email, role: user.loaiNguoiDung },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 🔥 Đặt res.cookie() TRƯỚC res.json()
        res.cookie('token', token, {
            httpOnly: true,   // Chặn truy cập từ JavaScript
            secure: true,     // Chỉ gửi qua HTTPS
            sameSite: 'Strict', // Chống CSRF
            maxAge: 3600000   // Hết hạn sau 1 giờ
        });

        return res.json({ token });  // ✅ Gửi response sau cùng
    });
});

module.exports = router;
