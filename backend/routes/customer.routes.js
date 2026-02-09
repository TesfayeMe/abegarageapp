// import the express module
const express = require('express');
//import controller functions
const customerController = require('../controllers/customer.controller');
const authMiddleWare = require('../middlewares/auth.middleware')
//import router
const router = express.Router();
//route to add a new customer
router.post('/api/add-customer', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], customerController.addCustomer);
//view customers
router.get('/api/customers', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], customerController.getAllCustomers);
//edit customer
router.get('/api/customer/:customerId', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], customerController.getCustomerById);
//edit customer
router.put('/api/edit-customer', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], customerController.editCustomer);
//export the router
router.delete('/api/delete-customer/:customerId', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], customerController.deleteCustomer);
//export the router
module.exports = router;