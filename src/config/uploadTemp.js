const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // Vị trí
  destination: (req, file, cb) => {
    cb(null, "src/public/temp/"); 
  },
  // Tên file
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload_temp = multer({ storage });

module.exports = upload_temp;
