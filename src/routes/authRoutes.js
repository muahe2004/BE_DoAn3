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
            { id: user.maNguoiDung, email: user.email, role: user.loaiNguoiDung, soDu: user.soDu },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 🔥 Đặt res.cookie() TRƯỚC res.json()
        res.cookie('token', token, {
            httpOnly: true,  
            secure: true,    
            sameSite: 'Strict', // Chống CSRF
            maxAge: 3600000   
        });

        return res.json({ token });  
    });
});

router.get('/role', (req, res) => {
    try {
        const token = req.cookies.token;

        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return res.json({ role: user.role });
            } catch (err) {
                return res.status(401).json({ message: "Token không hợp lệ!" });
            }
        }

        if (req.user) {
            return res.json({ role: req.user.role });
        }

        return res.status(401).json({ message: "Chưa đăng nhập!" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server!" });
    }
});

router.get('/balance', (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Chưa đăng nhập!" });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        const email = user.email;

        // Truy vấn người dùng theo email
        NguoiDung.findByUsername(email, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi server khi truy vấn CSDL', err });
            }

            if (!results || results.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }

            const soDu = results[0].soDu;
            return res.json({ soDu });
        });

    } catch (err) {
        return res.status(401).json({ message: "Token không hợp lệ!", err });
    }
});


router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    });

    res.status(200).json({ message: "Đăng xuất thành công!" });
});

module.exports = router;
