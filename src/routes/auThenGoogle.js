const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// Các route của bạn ở đây
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        if (!req.user || !req.user.token) {
            return res.redirect("/login");
        }

        const userToken = req.user.token;

        

        // Set token vào cookie
        res.cookie('token', userToken, { 
            httpOnly: true,   // Đảm bảo cookie không thể truy cập từ JavaScript client
            secure: false,
            maxAge: 3600000   // Thời gian hết hạn của cookie (1 giờ ở đây)
        });
  
      // Chuyển hướng về frontend kèm token
      res.redirect(`http://localhost:5173`);
    }
  );
  
  

module.exports = router;
