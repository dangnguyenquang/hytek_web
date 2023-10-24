const productInfo = require("../models/productInfo");
const fs = require("fs");
const path = require("path");
const archiver = require('archiver'); 
const ExcelJS = require('exceljs');

function getArrOfFolderName(parentPath) {
  const subdirectories = [];

  try {
    const files = fs.readdirSync(parentPath);

    for (const file of files) {
      const fullPath = path.join(parentPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        subdirectories.push(file);
      }
    }
  } catch (err) {
    console.error('Lỗi khi đọc thư mục:', err);
  }

  return subdirectories;
}

async function createReportFile(customerName) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Report Sheet 1');
  const parentPath = path.join(__dirname, `../uploads/${customerName}`);
  const subdirectories = getArrOfFolderName(parentPath);
  const reportFilePath = path.join(__dirname, `../reportFile/${customerName}.xlsx`);

  const folderDataArray = subdirectories.map(folderName => {
    const img = path.join(__dirname, `../uploads/${customerName}/${folderName}/img`);
    const design = path.join(__dirname, `../uploads/${customerName}/${folderName}/design`);
    const gerber = path.join(__dirname, `../uploads/${customerName}/${folderName}/gerber`);
    const bom = path.join(__dirname, `../uploads/${customerName}/${folderName}/bom`);
    const assemblyGuidelines = path.join(__dirname, `../uploads/${customerName}/${folderName}/assembly-guidelines`);
    const testingGuidelines = path.join(__dirname, `../uploads/${customerName}/${folderName}/testing-guidelines`);
    const productionHistory = path.join(__dirname, `../uploads/${customerName}/${folderName}/production-history`);
    const troubleShootingGuidelines = path.join(__dirname, `../uploads/${customerName}/${folderName}/trouble-shooting-guidelines`);

    const imgExists = fs.existsSync(img) && fs.readdirSync(img).length > 0;
    const designExists = fs.existsSync(design) && fs.readdirSync(design).length > 0;
    const gerberExists = fs.existsSync(gerber) && fs.readdirSync(gerber).length > 0;
    const bomExists = fs.existsSync(bom) && fs.readdirSync(bom).length > 0;
    const assemblyGuidelinesExists = fs.existsSync(assemblyGuidelines) && fs.readdirSync(assemblyGuidelines).length > 0;
    const testingGuidelinesExists = fs.existsSync(testingGuidelines) && fs.readdirSync(testingGuidelines).length > 0;
    const productionHistoryExists = fs.existsSync(productionHistory) && fs.readdirSync(productionHistory).length > 0;
    const troubleShootingGuidelinesExists = fs.existsSync(troubleShootingGuidelines) && fs.readdirSync(troubleShootingGuidelines).length > 0;

    return {
      folderName: folderName,
      imgExists: imgExists,
      designExists: designExists,
      gerberExists: gerberExists,
      bomExists: bomExists,
      assemblyGuidelinesExists: assemblyGuidelinesExists,
      testingGuidelinesExists: testingGuidelinesExists,
      productionHistoryExists: productionHistoryExists,
      troubleShootingGuidelinesExists: troubleShootingGuidelinesExists,
    };
  });

  worksheet.columns = [
    { header: '#', key: 'index', width: 5 },
    { header: 'folderName', key: 'folderName', width: 20 },
    { header: 'img', key: 'img', width: 10 },
    { header: 'design', key: 'design', width: 10 },
    { header: 'gerber', key: 'gerber', width: 10 },
    { header: 'bom', key: 'bom', width: 10 },
    { header: 'assembly-guidelines', key: 'assembly-guidelines', width: 10 },
    { header: 'testing-guidelines', key: 'testing-guidelines', width: 10 },
    { header: 'production-history', key: 'production-history', width: 10 },
    { header: 'trouble-shooting-guidelines', key: 'trouble-shooting-guidelines', width: 10 },
    // Thêm các cột khác theo cấu trúc dữ liệu
  ];

  // Thêm dữ liệu vào worksheet
  folderDataArray.forEach((item, index) => {
    worksheet.addRow({
      index: index + 1,
      folderName: item.folderName,
      img: item.imgExists ? 'Y' : 'N',
      design: item.designExists ? 'Y' : 'N',
      gerber: item.gerberExists ? 'Y' : 'N',
      bom: item.bomExists ? 'Y' : 'N',
      'assembly-guidelines': item.assemblyGuidelinesExists ? 'Y' : 'N',
      'testing-guidelines': item.testingGuidelinesExists ? 'Y' : 'N',
      'production-history': item.productionHistoryExists ? 'Y' : 'N',
      'trouble-shooting-guidelines': item.troubleShootingGuidelinesExists ? 'Y' : 'N',
    });
  });

  // Lưu workbook ra tệp Excel
  if (fs.existsSync(reportFilePath)) {
    fs.unlinkSync(reportFilePath);
  }
  await workbook.xlsx.writeFile(reportFilePath);
}

function createRarArchive(nameField, customerName) {
  const folderPath = path.join(__dirname, `../uploads/${customerName}/${nameField}/`);
  const zipFolder = path.join(__dirname, `../zipFolder/${customerName}`);
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
    const customerName = req.params.customerName;
    const folderPath = path.join(__dirname, `../uploads/${customerName}/${folderName}`);
    const zipPath = path.join(__dirname, `../zipFolder/${customerName}/${folderName}.rar`);

    fs.rm(folderPath, { recursive: true }, err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa thư mục.' });
      } else {
        fs.unlinkSync(zipPath);
        productInfo.findOneAndDelete ({ folderName: folderName, customerName: customerName })
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
        createReportFile(customerName)
          .then(() => {
            console.log('Tệp Excel báo cáo đã được tạo thành công.');
          })
          .catch((error) => {
            console.error('Lỗi khi tạo tệp Excel báo cáo:', error);
          });
      }
    });
  }

  deleteFile(req, res) {
    const folderName = req.params.folderName;
    const downloadPath = req.params.downloadPath;
    const fileName = req.params.fileName;
    const customerName = req.params.customerName;

    const filePath = path.join(__dirname,`../uploads/${customerName}/${folderName}/${downloadPath}/${fileName}`);

    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        createRarArchive(folderName, customerName);
        createReportFile(customerName)
          .then(() => {
            console.log('Tệp Excel báo cáo đã được tạo thành công.');
          })
          .catch((error) => {
            console.error('Lỗi khi tạo tệp Excel báo cáo:', error);
          });
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
