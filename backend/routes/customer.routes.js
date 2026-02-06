// import the express module
const express = require('express');
//import controller functions
const customerController = require('../controllers/customer.controller');
const authMiddleWare = require('../middlewares/auth.middleware')
//import router
const router = express.Router();
//route to add a new customer
router.post('/api/add-customer', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], customerController.addCustomer);
//export the router
module.exports = router;