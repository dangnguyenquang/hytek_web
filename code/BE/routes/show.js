const express = require('express');
const router = express.Router();
const showControllers = require('../controllers/ShowControllers');

// Xử lý các đường dẫn
router.get('/', showControllers.show);
router.get('/detail', showControllers.detail);
router.get('/customerNameList', showControllers.getArrCustomerName);
router.get('/download/:customerName/:folderName/:downloadPath/:fileName', showControllers.download);
router.get('/download/rar/:customerName/:folderName', showControllers.downloadRar);
router.get('/download/report/:customerName', showControllers.downloadReportFile);
router.get('/renderIMG/:customerName/:folderName/:fileName', showControllers.renderIMG);
  
module.exports = router; 
