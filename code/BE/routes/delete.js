const express = require('express');
const router = express.Router();
const deleteControllers = require('../controllers/DeleteControllers');

// Xử lý các đường dẫn
router.delete('/folder/:customerName/:folderName', deleteControllers.deleteFolder);
router.delete('/file/:customerName/:folderName/:downloadPath/:fileName', deleteControllers.deleteFile);
  
module.exports = router; 