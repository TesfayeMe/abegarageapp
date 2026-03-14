// import the express module
const express = require('express');
//import controller functions
const orderController = require('../controllers/order.controller');
const authMiddleWare = require('../middlewares/auth.middleware')
//import router
const router = express.Router();
//add customer garage orders by vehicle id
router.get('/api/orders/:cust_veh_id', [authMiddleWare.verifyToken], orderController.getOrder); 
//get customer orders
router.get('/api/get-services', authMiddleWare.verifyToken, orderController.getOrders); 
//get order by id
router.get('/api/order/:order_id', authMiddleWare.verifyToken, orderController.getOrderById);
//update internal note for an order
router.put('/api/update-order/:order_id/:orderColumn', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.updateOrder);
module.exports = router