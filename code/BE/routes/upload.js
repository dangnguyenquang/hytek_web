const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadControllers = require('../controllers/UploadControllers');
const path = require('path');
const fs = require('fs');

// Cấu hình Multer để xử lý tải lên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Thư mục trung gian để lưu tệp tạm thời
    const tempUploadDir = 'temp_uploads/';

    // Tạo thư mục trung gian nếu chưa tồn tại
    if (!fs.existsSync(tempUploadDir)) {
      fs.mkdirSync(tempUploadDir, { recursive: true });
    }

    cb(null, tempUploadDir);
  },
  filename: (req, file, cb) => {
    // Đặt tên tệp bằng cách kết hợp tên tệp gốc và thời gian tải lên
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext);
    const newFileName = `${fileName}_${Date.now()}${ext}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

// Xử lý các đường dẫn
router.post('/', upload.array('files'), uploadControllers.img);

module.exports = router; 