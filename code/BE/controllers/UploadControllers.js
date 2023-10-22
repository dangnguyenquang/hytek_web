const productInfo = require("../models/productInfo");
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function createRarArchive(nameField) {
  const folderPath = path.join(__dirname, `../uploads/${nameField}/`);
  const zipFolder = path.join(__dirname, '../zipFolder');
  const zipFilePath = path.join(zipFolder, `${nameField}.rar`); // Đường dẫn tới tệp ZIP đích

  // Xoá tệp ZIP nếu đã tồn tại
  if (fs.existsSync(zipFilePath)) {
    fs.unlinkSync(zipFilePath);
  }

  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 6 }, // Mức nén tối đa
  });

  archive.pipe(output);
  archive.directory(folderPath, nameField);
  archive.finalize();

  output.on('close', () => {
    console.log('Thư mục đã được nén và đặt tên lại thành công.');
  });

  output.on('error', (err) => {
    console.error('Lỗi khi nén thư mục:', err);
  });
}


// Hàm lưu data
async function checkAndSave(folderName, folderID, nameField, customerName) {
  try {
    // Kiểm tra xem có bản tin nào trong "productInfo" có trường "id" trùng với "folderName" không
    const existingProduct = await productInfo.findOne({ folderName: nameField });
    // Nếu không tìm thấy bản tin, thì lưu bản tin mới vào collection "productInfo"
    if (!existingProduct) {
      const newProduct = new productInfo({ 
        name: folderName,
        id: folderID,
        folderName: nameField,
        customerName: customerName,
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
    const customerName = req.body.customerName;
    const uploadDir = `uploads/${nameField}/`;

    var result = 0;
    var message = "";

    if (!fs.existsSync(uploadDir)) {
      result = 0;
      message = `Phải import ít nhất một file vào`;
    } else {
      const saved = await checkAndSave(folderName, folderID, nameField, customerName);
      if(saved) {
        result = 1;
        message = `Tạo mới thành công`;
      } else {
        result = 2;
        message = `Đã cập nhật thành công file vào ${nameField}`;
      }
      createRarArchive(nameField);
    }

    var resjson = {
      result: result,
      message: message
    }

    res.json(resjson);
  }
}

module.exports = new uploadControllers();
