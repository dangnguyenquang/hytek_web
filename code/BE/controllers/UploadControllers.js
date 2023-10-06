const productInfo = require("../models/productInfo");
const fs = require('fs');
const path = require('path');

var result = 1;
var message = "Thành công";

// Hàm lưu data
async function checkAndSave(folderID, folderName) {
  try {
    // Kiểm tra xem có bản tin nào trong "productInfo" có trường "id" trùng với "folderName" không
    const existingProduct = await productInfo.findOne({ id: folderID });
    // Nếu không tìm thấy bản tin, thì lưu bản tin mới vào collection "productInfo"
    if (!existingProduct) {
      const newProduct = new productInfo({ 
        name: folderName,
        id: folderID,
        folderName: `${folderName}-${folderID}`
      });
      await newProduct.save();
      console.log("Bản tin đã được lưu thành công.");
    } else {
      console.log("Bản tin đã tồn tại, không cần lưu lại.");
      result = 2;
      message = `Đã cập nhật thành công file vào ${folderName}-${folderID}`;
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra và lưu bản tin:", error);
  }
}

class uploadControllers {
  upload(req, res) {
    // Lấy tên thư mục từ trường dữ liệu 'folderName' trong yêu cầu
    const folderID = req.body.folderID;
    const folderName = req.body.folderName;
    const nameField = `${folderName}-${folderID}`;
    const uploadDir = `uploads/${nameField}/`;

    if (!fs.existsSync(uploadDir)) {
      result = 0;
      message = `Phải import ít nhất một file vào`;
      console.log(message);
    } else {
      checkAndSave(folderID, folderName);
    }

    var resjson = {
      result: result,
      message: message
    }

    res.json(resjson);
  }
}

module.exports = new uploadControllers();
