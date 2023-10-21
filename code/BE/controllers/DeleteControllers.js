const productInfo = require("../models/productInfo");
const fs = require("fs");
const path = require("path");

class deleteControllers {

  deleteFolder(req, res) {
    const folderName = req.params.folderName;
    const folderPath = path.join(__dirname, `../uploads/${folderName}`);

    fs.rm(folderPath, { recursive: true }, err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa thư mục.' });
      } else {
        productInfo.findOneAndDelete ({ folderName: folderName })
          .then((doc) => {
            if (doc) {
              res.json({ message: 'Thư mục đã được xóa thành công.' });
            } else {
              res.status(500).json({ error: 'Lỗi khi xóa thư mục.' });
            }
          })
          .catch((err) => {
            console.error('Error while deleting the record:', err);
          });
      }
    });
  }

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
