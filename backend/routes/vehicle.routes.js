// import the express module
const express = require('express');
//import controller functions
const vehicleController = require('../controllers/vehicle.controller');
const authMiddleWare = require('../middlewares/auth.middleware')
//import router
const router = express.Router();
//route to add a new vehicle
router.post('/api/add-vehicle', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], vehicleController.addVehicle); 
//get vehicles by customer id
router.get('/api/vehicles/:customerId', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], vehicleController.getVehiclesByCustomerId); 
//export the router
module.exports = router;