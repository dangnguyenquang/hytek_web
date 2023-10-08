const express = require('express');
const router = express.Router();
const showControllers = require('../controllers/ShowControllers');

// Xử lý các đường dẫn
router.get('/', showControllers.show);
  
module.exports = router; 
