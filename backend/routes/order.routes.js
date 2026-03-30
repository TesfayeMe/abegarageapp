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
//insert notes of an order
router.post('/api/add-order-comments', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.AddComments);
//insert replays of an order
router.get('/api/get-order-notes/:orderId', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.getOrderComments);
//get order additional request
router.get('/api/get-order-additional-request/:orderId', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.getOrderAdditionalRequest);
//add order additional request
router.post('/api/add-new-additional-request', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.addAdditionalRequest);
//update order status
router.put('/api/update-order-status', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.updateOrderStatus);
//get active order
router.get('/api/get-active-orders/:vehicleId', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.getActiveOrders);
//get closed orders
router.get('/api/get-closed-orders/:vehicleId', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.getClosedOrders)
module.exports = router