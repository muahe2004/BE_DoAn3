const express = require('express');
const upload_temp = require('../config/uploadTemp');
const router = express.Router();
const cloudinary = require('../config/cloudinaryConfig'); 
const fs = require('fs').promises;
const path = require('path'); 

router.post('/api/cloudinary-upload', upload_temp.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file nào được tải lên' });
    }

    const filePath = req.file.path; 

    // Upload lên Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'my_app_images',
      resource_type: 'image',
      public_id: path.parse(req.file.filename).name
    });

    // Xóa file tạm
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Không xóa được file tạm: ${filePath}`, error);
    }

    res.json({
      message: 'Upload thành công',
      imageUrl: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    if (req.file?.path) {
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
