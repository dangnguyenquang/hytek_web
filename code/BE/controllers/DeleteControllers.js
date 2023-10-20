const productInfo = require("../models/productInfo");
const fs = require("fs");
const path = require("path");

class deleteControllers {
  deleteFile(req, res) {
    const folderName = req.params.folderName;
    const downloadPath = req.params.downloadPath;
    const fileName = req.params.fileName;

    const filePath = path.join(__dirname,`../uploads/${folderName}/${downloadPath}/${fileName}`);

    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        res.status(200).json({ message: "Tệp đã được xóa thành công." });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Lỗi khi xóa tệp." });
      }
    } else {
      res.status(404).json({ error: "Không tìm thấy tệp để xóa." });
    }
  }
}

module.exports = new deleteControllers();
