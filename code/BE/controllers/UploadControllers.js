const productInfo = require("../models/productInfo");
const fs = require('fs');
const path = require('path');

// Hàm lưu data
async function checkAndSave(folderName, folderID, nameField) {
  try {
    // Kiểm tra xem có bản tin nào trong "productInfo" có trường "id" trùng với "folderName" không
    const existingProduct = await productInfo.findOne({ folderName: nameField });
    // Nếu không tìm thấy bản tin, thì lưu bản tin mới vào collection "productInfo"
    if (!existingProduct) {
      const newProduct = new productInfo({ 
        name: folderName,
        id: folderID,
        folderName: nameField
      });
      await newProduct.save();
      console.log("Bản tin đã được lưu thành công.");
      return true;
    } else {
      console.log("Bản tin đã tồn tại, không cần lưu lại.");
      return false;
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra và lưu bản tin:", error);
  }
}

class uploadControllers {
  async  upload(req, res) {
    // Lấy tên thư mục từ trường dữ liệu 'folderName' trong yêu cầu
    const folderID = req.body.folderID;
    const folderName = req.body.folderName;
    const nameField = `${folderName}-${folderID}`;
    const uploadDir = `uploads/${nameField}/`;

    var result = 0;
    var message = "";

    if (!fs.existsSync(uploadDir)) {
      result = 0;
      message = `Phải import ít nhất một file vào`;
    } else {
      const saved = await checkAndSave(folderName, folderID, nameField);
      if(saved) {
        result = 1;
        message = `Tạo mới thành công`;
      } else {
        result = 2;
        message = `Đã cập nhật thành công file vào ${nameField}`;
      }
    }

    var resjson = {
      result: result,
      message: message
    }

    res.json(resjson);
  }
}

module.exports = new uploadControllers();
