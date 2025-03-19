const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // Vị trí
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads/"); 
  },
  // Tên file
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
