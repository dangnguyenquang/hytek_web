const productInfo = require("../models/productInfo");
const fs = require('fs');
const path = require('path');
const uploadDir = 'uploads/'; // Thư mục gốc cho việc lưu tệp tải lên

// Hàm lưu data
async function checkAndSave(folderName) {
  try {
    // Kiểm tra xem có bản tin nào trong "productInfo" có trường "id" trùng với "folderName" không
    const existingProduct = await productInfo.findOne({ id: folderName });
    // Nếu không tìm thấy bản tin, thì lưu bản tin mới vào collection "productInfo"
    if (!existingProduct) {
      const newProduct = new productInfo({ id: folderName });
      await newProduct.save();
      console.log("Bản tin đã được lưu thành công.");
    } else {
      console.log("Bản tin đã tồn tại, không cần lưu lại.");
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra và lưu bản tin:", error);
  }
}

class uploadControllers {
  img(req, res) {
    // Lấy tên thư mục từ trường dữ liệu 'folderName' trong yêu cầu
    const folderName = req.body.folderName;

    checkAndSave(folderName);

    if (!folderName) {
      return res.status(400).send("Tên thư mục không được để trống.");
    }

    // Thư mục cuối cùng để lưu tệp tải lên
    const finalUploadDir = path.join(uploadDir, folderName);

    // Tạo thư mục cuối cùng nếu chưa tồn tại
    if (!fs.existsSync(finalUploadDir)) {
      fs.mkdirSync(finalUploadDir, { recursive: true });
    }

    // Di chuyển các tệp từ thư mục trung gian đến thư mục cuối cùng
    const tempUploadDir = "temp_uploads/";
    const files = fs.readdirSync(tempUploadDir);
    files.forEach((file) => {
      const sourcePath = path.join(tempUploadDir, file);
      const destinationPath = path.join(finalUploadDir, file);
      fs.renameSync(sourcePath, destinationPath);
    });

    return res.status(200).send("Tải tệp lên và lưu vào thư mục thành công.");
  }
}

module.exports = new uploadControllers();
