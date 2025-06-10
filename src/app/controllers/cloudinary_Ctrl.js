const cloudinary = require('../../config/cloudinaryConfig');
const fs = require('fs').promises; 

// Upload ảnh
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Không có file nào được tải lên' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'mlearningBlogPhoto', 
      resource_type: 'image'
    });

    // Xóa file tạm trên server
    await fs.unlink(req.file.path);

    res.json({
      message: 'Tải ảnh lên thành công',
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    res.status(500).json({ error: 'Tải ảnh lên thất bại', details: error.message });
  }
};

// Lấy ảnh theo public_id
exports.getImage = async (req, res) => {
  try {
    const { public_id } = req.params;
    const result = await cloudinary.api.resource(public_id);
    res.json({
      message: 'Hình ảnh đã được lấy',
      url: result.secure_url,
      details: result
    });
  } catch (error) {
    res.status(404).json({ error: 'Không tìm thấy hình ảnh', details: error.message });
  }
};