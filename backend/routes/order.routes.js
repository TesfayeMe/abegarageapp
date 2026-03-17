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
router.post('/api/insert-order-comments/:order_id/:commentsFor', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.insertComments);
//insert replays of an order
router.post('/api/insert-order-replays/:comment_id', [authMiddleWare.verifyToken, authMiddleWare.isManagerAndAdmin], orderController.insertReplays);
module.exports = router