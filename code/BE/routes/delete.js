const express = require('express');
const router = express.Router();
const deleteControllers = require('../controllers/DeleteControllers');

// Xử lý các đường dẫn
// router.get('/folder/:folderName', deleteControllers.deleteFolder);
router.delete('/file/:folderName/:downloadPath/:fileName', deleteControllers.deleteFile);
  
module.exports = router; 