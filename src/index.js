// Import thư viện
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");

// Import file cấu hình
const db = require("./config/db");
const route = require("./routes");

// Kết nối cơ sở dữ liệu
db.connect();

// Khởi tạo ứng dụng Express
const app = express();
const port = 1000;

// Cấu hình session
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false, 
//   })
// );

app.use(passport.initialize());

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token;

    // Set token vào cookie
    res.cookie('token', token, { 
      httpOnly: true,   // Đảm bảo cookie không thể truy cập từ JavaScript client
      secure: process.env.NODE_ENV === 'production',  // Chỉ sử dụng https trong môi trường production
      maxAge: 3600000   // Thời gian hết hạn của cookie (1 giờ)
    });

    // Sau khi set cookie, chuyển hướng về trang chủ (hoặc bất kỳ URL nào bạn muốn)
    res.redirect("http://localhost:5173"); // Thay đổi URL nếu cần
  }
);


// Cấu hình Middleware
app.use(cookieParser()); // Cho phép đọc cookie từ request
app.use(express.json()); // Cho phép xử lý dữ liệu JSON từ body request
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu từ form HTML
app.use(express.static(path.join(__dirname, "public"))); // Thiết lập thư mục chứa file tĩnh

// Cấu hình CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: "http://localhost:5173", // Chỉ định origin được phép truy cập API
    methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức HTTP được phép sử dụng
    allowedHeaders: ["Content-Type", "Authorization"], // Các headers được phép
    credentials: true, // Cho phép gửi cookie kèm request
  })
);

// Cho phép truy cập thư mục chứa ảnh tải lên
app.use("/uploads", express.static("src/public/uploads"));

// Khởi tạo route
route(app);

// Khởi động server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});





