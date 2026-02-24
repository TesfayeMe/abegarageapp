// import the express module
const express = require('express');
//import controller functions
const serviceController = require('../controllers/service.controller');
const authMiddleWare = require('../middlewares/auth.middleware')
//import router
const router = express.Router();
//add garage services
router.post('/api/add-service', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], serviceController.addServices );
//get All services
// router.get('/api/services', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], serviceController.getAllServices );
router.get('/api/services',  [authMiddleWare.verifyToken, authMiddleWare.isAdmin], serviceController.getAllServices );
module.exports = router