const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");

const db = require("./config/db");
const route = require("./routes");

db.connect();

const app = express();
const port = 1000;

app.use(passport.initialize());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: ['*'], 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
  })
);

app.use("/uploads", express.static("src/public/uploads"));

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});