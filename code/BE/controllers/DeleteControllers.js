const productInfo = require("../models/productInfo");
const fs = require("fs");
const path = require("path");
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

class deleteControllers {

  deleteFolder(req, res) {
    const folderName = req.params.folderName;
    const folderPath = path.join(__dirname, `../uploads/${folderName}`);
    const zipPath = path.join(__dirname, `../zipFolder/${folderName}.rar`);

    fs.rm(folderPath, { recursive: true }, err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa thư mục.' });
      } else {
        fs.unlinkSync(zipPath);
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
        createRarArchive(folderName);
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
