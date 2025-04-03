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

        const token = jwt.sign(
          {name: profile.displayName, email: profile.emails[0].value },
          process.env.JWT_SECRET, 
          { expiresIn: "1h" }
        );
  
        profile.token = token;
        return done(null, profile);
      }
    )
);
  
  passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;