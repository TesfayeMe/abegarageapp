const orderService = require('../services/order.services')
const getOrder = async (req, res, next) => {
    // const customer_vehicle_id = req.body;
    const { cust_veh_id } = req.params;
    // console.log(cust_veh_id)
    const customer_id = cust_veh_id.split(',')[0];
    const vehicle_id = cust_veh_id.split(',')[1];
    // console.log(customer_id)
    // console.log(vehicle_id)
    const customer_vehicle_id = { customer_id: customer_id, vehicle_id: vehicle_id };
    const getOrder = await orderService.getOrder(customer_vehicle_id);
    if (getOrder) {
        return res.status(200).json({
            status: true,
            message: 'Order found',
            data: getOrder[0]
        })
    }
    else {
        return res.status(400).json({
            status: false,
            message: 'Order not found'
        })
    }
}
const getOrders = async (req, res) =>{ 
   const orders = await orderService.getOrders();
   if(orders)
    {
        return res.status(200).json({
            status: true,
            message: 'Data found',
            data: orders
        })
    }
    else
        {
        //  console.log('ordcntrl ', orders)
        return res.status(400).json({
            status: false,
            message: 'order not found'
        })
     }
}

const getOrderById = async (req, res) => {
    const { order_id } = req.params;
    const order = await orderService.getOrderById(order_id);
    if (order) {
        return res.status(200).json({
            status: true,
            message: 'Order found',
            data: order
        })
    }
    else {
        return res.status(400).json({
            status: false,
            message: 'Order not found'
        })
    }
}
const insertComments = async (req, res) => {
    const { order_id } = req.params;
    const { commentsFor } = req.params;
    const { noteContent } = req.body;
    const { employee_id } = req.body;
    const updateResult = await orderService.insertComments(order_id, noteContent, commentsFor, employee_id);
    if (updateResult) {
        return res.status(200).json({
            status: true,
            message: 'Internal note updated successfully',
        });
    } else {
        return res.status(400).json({
            status: false,
            message: 'Failed to update internal note',
        });
    }
}

const insertReplays = async (req, res) => {
    const { comment_id } = req.params;
    const { noteContent } = req.body;
    const { employee_id } = req.body;
    const updateResult = await orderService.insertReplays(comment_id, noteContent, employee_id);
    if (updateResult) {
        return res.status(200).json({
            status: true,
            message: 'Replay added successfully',
        });
    } else {
        return res.status(400).json({
            status: false,
            message: 'Failed to add replay',
        });
    }
}

const getOrderAdditionalRequest = async (req, res) => {
    const { orderId } = req.params;
    const getOrderAdditionalRequest =  await orderService.getOrderAdditionalRequest(orderId);
    // console.log(getOrderAdditionalRequest);
    if(getOrderAdditionalRequest)
    {
        return res.status(200).json({
            status: true,
            message: 'Additional Request Found',
            data: getOrderAdditionalRequest
        })
    }
    else
    {
         return res.status(400).json({
            status: false,
            message: 'Additional Request Not Found'
        })
    }
}

const addAdditionalRequest = async (req, res) => {
    const orderAdditionalRequestData = req.body;
    const addAdditionalRequest = await orderService.addAdditionalRequest(orderAdditionalRequestData);
    if(addAdditionalRequest)
    {
        return res.status(200).json({
            status: true,
            message: 'Additional request successfully added'
        })
    }
    else
    {
        return res.status(400).json({
            status: false,
            message: 'Additional request not successfully added'
        })
    }
}
const orderController = {
    getOrder,
    getOrders,
    getOrderById,
    insertComments,
    insertReplays,
    getOrderAdditionalRequest,
    addAdditionalRequest
}

module.exports = orderController;