const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const authMiddleware = require('../app/middlewares/authMiddleware');


const router = express.Router();

// Dữ liệu người dùng mẫu
const users = [
    { 
        id: 1, 
        username: 'admin', 
        password: bcrypt.hashSync('1234', 10), // 🔥 Mã hóa mật khẩu trước khi lưu
        role: 'admin' 
    }
];

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token });
});

module.exports = router;
