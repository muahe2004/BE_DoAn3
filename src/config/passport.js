const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
require("dotenv").config();


passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:1000/auth/google/callback",
        scope: ["profile", "email"],
      },
      (accessToken, refreshToken, profile, done) => {
        // Tạo JWT token từ profile của user
        const token = jwt.sign(
          {name: profile.displayName, email: profile.emails[0].value },
          process.env.JWT_SECRET, // Bạn cần thêm biến này vào `.env`
          { expiresIn: "1h" }
        );
  
        // Gán token vào profile để sử dụng sau
        profile.token = token;
        return done(null, profile);
      }
    )
);
  
  

// Serialize và Deserialize user để lưu vào session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
