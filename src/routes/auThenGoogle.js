const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const authController = require('../app/controllers/auThenGoogle');
const usersController = require('../app/controllers/NguoiDung_Ctrl');
const NguoiDung = require("../app/models/nguoiDung");


router.get("/", authController.home);
router.get("/profile", authController.profile);
router.get("/login-success", authController.loginSuccess);
router.get("/logout", authController.logout);

router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
}));



router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        if (!req.user || !req.user.emails || req.user.emails.length === 0) {
            return res.json({Lỗi: "Lỗi"});
        }

        const email = req.user.emails[0].value;

        NguoiDung.findByUsername(email, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi truy vấn người dùng!", error: err });
            }

            if (result && result.length > 0) {
                // 👉 Đã tồn tại => tạo token và trả về
                const user = result[0];

                const token = jwt.sign(
                    {
                        id: user.maNguoiDung,
                        email: user.email,
                        role: "Học viên",
                        tenNguoiDung: user.tenNguoiDung,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 3600000,
                });

                return res.redirect(`http://localhost:5173`);
            }

            // ❌ Chưa tồn tại => tạo mới
            const newUser = {
                tenNguoiDung: req.user.displayName,
                email: email,
                matKhau: req.user.id,
                anhDaiDien: req.user.photos[0].value || 'http://localhost:1000/uploads/defaultAvatar.png',
            };

            NguoiDung.create(newUser, (err, resultCreate) => {
                if (err) {
                    return res.status(500).json({ message: "Lỗi tạo người dùng mới!", error: err });
                }

                const id = newUser.maNguoiDung;

                const token = jwt.sign(
                    {
                        id,
                        email: newUser.email,
                        role: "Học viên",
                        tenNguoiDung: newUser.tenNguoiDung,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 3600000,
                });

                return res.redirect(`http://localhost:5173`);
            });
        });
    }
);

router.get("/auth-google/get-user-info", (req, res) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Không tìm thấy token!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        if (!email) {
            return res.status(400).json({ message: "Token không chứa email!" });
        }

        NguoiDung.findByEmail(email, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi truy vấn người dùng!", error: err });
            }

            if (!result || result.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy người dùng!" });
            }

            return res.status(200).json(result[0]); // chỉ trả 1 user
        });

    } catch (err) {
        return res.status(401).json({
            message: "Token không hợp lệ!",
            error: err.message,
            token: token
        });
    }
});

module.exports = router;
