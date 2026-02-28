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
router.get('/api/services',  [authMiddleWare.verifyToken, authMiddleWare.isAdmin], serviceController.getAllServices );
//get service by id
router.get('/api/service/:service_id',  [authMiddleWare.verifyToken, authMiddleWare.isAdmin], serviceController.getServiceById );
//update service
router.put('/api/edit-service',  [authMiddleWare.verifyToken, authMiddleWare.isAdmin], serviceController.updateService );
//delete services
router.put('/api/service-delete/:service_id',  [authMiddleWare.verifyToken, authMiddleWare.isAdmin], serviceController.deleteService );
module.exports = router