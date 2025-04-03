const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// Route xác thực Google và tạo người dùng mới
// Route xác thực Google và tạo người dùng mới
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    async (req, res) => {
        if (!req.user || !req.user.token) {
            return res.redirect("/login");
        }

        const userToken = req.user.token;

        // Set token vào cookie
        res.cookie('token', userToken, { 
            httpOnly: true,
            secure: false, 
            maxAge: 3600000 
        });

        res.redirect("http://localhost:5173"); 
    }
);


module.exports = router;
