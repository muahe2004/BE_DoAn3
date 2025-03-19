const express = require("express");
const upload = require("../config/uploadConfig"); 
const router = express.Router();

// API upload ảnh
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Không có file nào được tải lên" });
  }

  // Tạo đường dẫn URL ảnh
  const imageUrl = `http://localhost:1000/uploads/${req.file.filename}`;

  res.json({ imageUrl });
});

module.exports = router;
