const productInfo = require("../models/productInfo");
const fs = require("fs");
const path = require("path");

class showControllers {

  show(req, res) {
    productInfo
      .find({})
      .then((data) => {
        console.log("Lấy dữ liệu thành công từ collection productInfo");
        const result = 1;
        const message = "Thành công";
        const total_data = data.length;

        const resjson = {
          result: result,
          message: message,
          total_data: total_data,
          data: data,
        };

        res.json(resjson);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu:", err);
        const result = 0;
        const message = `Lỗi khi lấy dữ liệu: ${err}`;
        const total_data = 0;
        const data = [];

        const resjson = {
          result: result,
          message: message,
          total_data: total_data,
          data: data,
        };

        res.json(resjson);
      });
  }

  async detail(req, res) {
    const uploadDir = path.join(__dirname, `../uploads/${req.query.customerName}/${req.query.folderName}`);

    try {
      const subfolders = await fs.promises.readdir(uploadDir);
  
      const folderData = {
        img: [],
        design: [],
        gerber: [],
        bom: [],
        "assembly-guidelines": [],
        "testing-guidelines": [],
        "production-history": [],
        "trouble-shooting-guidelines": [],
      };
  
      await Promise.all(
        subfolders.map(async (folder) => {
          const folderPath = path.join(uploadDir, folder);
  
          const files = await fs.promises.readdir(folderPath);
  
          folderData[folder] = files;
        })
      );
      
      console.log(folderData);

      res.json(folderData);
    } catch (err) {
      console.error('Lỗi khi xử lý yêu cầu:', err);
      res.status(500).json({ error: 'Lỗi khi xử lý yêu cầu' });
    }
  }

  downloadRar (req, res) {
    const folderName = req.params.folderName;
    const customerName = req.body.customerName;
    const filePath = path.join(__dirname, `../zipFolder/${customerName}/${folderName}`);
    res.download(filePath);
  }

  downloadReportFile (req, res) {
    const customerName = req.body.customerName;
    const reportPath = path.join(__dirname, `../reportFile/${customerName}.xlsx`);
    res.download(reportPath);
  }

  download (req, res) {
    const folderName = req.params.folderName;
    const downloadPath  = req.params.downloadPath ;
    const fileName = req.params.fileName;
    const customerName = req.body.customerName;
    const filePath = path.join(__dirname, `../uploads/${customerName}/${folderName}/${downloadPath}/${fileName}`);
    res.download(filePath);
  }

  renderIMG (req, res) {
    const folderName = req.params.folderName; 
    const fileName = req.params.fileName;
    const customerName = req.body.customerName;
    const imagePath = path.join(__dirname, `../uploads/${customerName}/${folderName}/img/${fileName}`);
    res.sendFile(imagePath);
  }
}

module.exports = new showControllers();
