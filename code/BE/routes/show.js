const express = require('express');
const router = express.Router();
const showControllers = require('../controllers/ShowControllers');

// Xử lý các đường dẫn
router.get('/', showControllers.show);
router.get('/detail', showControllers.detail);
router.get('/download/:folderName/:downloadPath/:fileName', showControllers.download);
router.get('/download/rar/:folderName', showControllers.downloadRar);
router.get('/renderIMG/:folderName/:fileName', showControllers.renderIMG);
  
module.exports = router; 
