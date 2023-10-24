const productInfo = require("../models/productInfo");
const fs = require('fs');
const path = require('path');
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
  if (!fs.existsSync(zipFolder)) {
    // Nếu thư mục không tồn tại, tạo mới thư mục
    fs.mkdirSync(zipFolder);
  }
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
    const uploadDir = `uploads/${customerName}/${nameField}/`;

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
      createRarArchive(nameField, customerName);
      createReportFile(customerName)
        .then(() => {
          console.log('Tệp Excel báo cáo đã được tạo thành công.');
        })
        .catch((error) => {
          console.error('Lỗi khi tạo tệp Excel báo cáo:', error);
        });
    }

    var resjson = {
      result: result,
      message: message
    }

    res.json(resjson);
  }
}

module.exports = new uploadControllers();
