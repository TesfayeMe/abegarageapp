// import the express module
const express = require('express');
//import controller functions
const serviceController = require('../controllers/service.controller');
const authMiddleWare = require('../middlewares/auth.middleware')
//import router
const router = express.Router();
//add garage services
router.post('/api/add-service', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], serviceController.addServices );
//get All services
router.get('/api/services',  [authMiddleWare.verifyToken], serviceController.getAllServices );
//get service by id
router.get('/api/service/:service_id',  [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], serviceController.getServiceById );
//update service
router.put('/api/edit-service',  [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], serviceController.updateService );
//delete services
router.put('/api/service-delete/:service_id',  [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], serviceController.deleteService );
    //restore services
router.put('/api/service-restore/:service_id',  [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], serviceController.restoreDeletedService );
module.exports = router