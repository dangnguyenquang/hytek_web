const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadControllers = require('../controllers/UploadControllers');
const path = require('path');
const fs = require('fs');

// Cấu hình Multer để xử lý tải lên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Lấy trường 'name' từ dữ liệu POST
    const folderName = req.body.folderName;
    const folderID = req.body.folderID;
    const nameField = `${folderName}-${folderID}`;
    const customerName = req.body.customerName;
    // Lấy tên trường của file
    const fieldname = file.fieldname;
    // Tạo đường dẫn thư mục đích dựa trên 'name' và 'fieldname'
    const uploadDir = `uploads/${customerName}/${nameField}/${fieldname}/`;
    fs.mkdirSync(uploadDir, { recursive: true }); // Tạo thư mục đích nếu chưa tồn tại
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Đặt tên tệp bằng cách kết hợp tên tệp gốc và thời gian tải lên
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext);
    const newFileName = `${fileName}$${Date.now()}${ext}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

// Xử lý các đường dẫn
router.post('/', upload.fields([
  { name: 'img'},
  { name: 'design'},
  { name: 'gerber'},
  { name: 'bom'},
  { name: 'assembly-guidelines'},
  { name: 'testing-guidelines'},
  { name: 'production-history'},
  { name: 'trouble-shooting-guidelines'},
]), uploadControllers.upload);

module.exports = router; 