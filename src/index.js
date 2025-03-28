// Import part
const path = require('path');

// Import thư viện vửa cài với lệnh npm install express
const express = require('express');

// Khởi tạo morgan 
// const morgan = require('morgan');

// Import express-handlebars
// const { engine } = require('express-handlebars'); 

// Import method-override
// const methodOverride = require('method-override');


const db = require('./config/db');

// Connect to db
db.connect();

// Khởi tạo hàm express
const app = express();
const port = 1000;

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các headers được phép
  credentials: true  // Cho phép gửi cookies
}));
app.use("/uploads", express.static("src/public/uploads"));



const route = require('./routes')

app.use(express.json()); // Cho phép đọc JSON từ body

// Middleware để xử lý dữ liệu từ form HTML
app.use(express.urlencoded({ extended: true }));

// Sử dụng morgan để log request
// app.use(morgan('combined'));

// Sử dụng template engine
// app.engine('hbs', engine({
//   extname: 'hbs', // Cái này để định nghĩa đuôi mở rộng cho ngắn,
//   helpers: {
//     sum: (a, b) => a + b,
//   }
// })); 

// Sử dụng method override
// app.use(methodOverride('_method'));

// Cấu hình đường dẫn tới thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, 'resources', 'views')); // Thư mục chứa các file template


route(app);



app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
