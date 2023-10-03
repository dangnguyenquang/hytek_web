const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const uploadDir = 'uploads/'; // Thư mục gốc cho việc lưu tệp tải lên

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

app.use(express.json());

app.post('/upload', upload.array('files'), (req, res) => {
  // Lấy tên thư mục từ trường dữ liệu 'folderName' trong yêu cầu
  const folderName = req.body.folderName;

  if (!folderName) {
    return res.status(400).send('Tên thư mục không được để trống.');
  }

  // Thư mục cuối cùng để lưu tệp tải lên
  const finalUploadDir = path.join(uploadDir, folderName);

  // Tạo thư mục cuối cùng nếu chưa tồn tại
  if (!fs.existsSync(finalUploadDir)) {
    fs.mkdirSync(finalUploadDir, { recursive: true });
  }

  // Di chuyển các tệp từ thư mục trung gian đến thư mục cuối cùng
  const tempUploadDir = 'temp_uploads/';
  const files = fs.readdirSync(tempUploadDir);
  files.forEach((file) => {
    const sourcePath = path.join(tempUploadDir, file);
    const destinationPath = path.join(finalUploadDir, file);
    fs.renameSync(sourcePath, destinationPath);
  });

  return res.status(200).send('Tải tệp lên và lưu vào thư mục thành công.');
});

app.listen(port, () => {
  console.log(`Máy chủ Node.js đang chạy tại http://localhost:${port}`);
});
