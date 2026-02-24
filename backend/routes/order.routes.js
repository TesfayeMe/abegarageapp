// import the express module
const express = require('express');
//import controller functions
const orderController = require('../controllers/order.controller');
const authMiddleWare = require('../middlewares/auth.middleware')
//import router
const router = express.Router();
//add customer garage orders by vehicle id
router.get('/api/orders',  [authMiddleWare.verifyToken, authMiddleWare.isAdmin], orderController.getOrders );
module.exports = router