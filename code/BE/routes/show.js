const express = require('express');
const router = express.Router();
const showControllers = require('../controllers/ShowControllers');

// Xử lý các đường dẫn
router.get('/', showControllers.show);
router.get('/detail', showControllers.detail);
  
module.exports = router; 
