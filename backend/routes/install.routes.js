
const express = require('express');
const router = express.Router();
const installController = require('../controllers/install.controller.js');
// Sample route for installation
router.get('/install', installController.install);
module.exports = router;