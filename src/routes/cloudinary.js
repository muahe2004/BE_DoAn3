const express = require('express');
const upload = require('../config/uploadConfig');
const router = express.Router();
const cloudinary = require('../config/cloudinaryConfig'); 
const fs = require('fs').promises;
const path = require('path'); 

router.post('/api/cloudinary-upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file nào được tải lên' });
    }

    // Tạo đường dẫn đầy đủ đến file tạm
    const filePath = path.join(__dirname, '../public/uploads', req.file.filename);
    try {
      await fs.access(filePath); // Kiểm tra file tồn tại
    } catch {
      return res.status(400).json({ message: `File không tồn tại: ${filePath}` });
    }

    // Upload lên Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'my_app_images',
      resource_type: 'image',
      public_id: path.parse(req.file.filename).name // Dùng tên file gốc, bỏ phần mở rộng
    });

    // Xóa file tạm
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Không xóa được file tạm: ${filePath}`, error);
    }

    // Trả về URL từ Cloudinary
    res.json({
      message: 'Upload thành công',
      imageUrl: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    // Xóa file tạm nếu upload thất bại
    if (req.file && req.file.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error(`Không xóa được file tạm: ${req.file.path}`, unlinkError);
      }
    }
    res.status(500).json({ message: 'Upload thất bại', error: error.message });
  }
});

module.exports = router;