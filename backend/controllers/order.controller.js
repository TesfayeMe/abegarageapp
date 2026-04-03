const orderService = require('../services/order.services')
const getOrder = async (req, res, next) => {
    const { cust_veh_id } = req.params;
    const customer_id = cust_veh_id.split(',')[0];
    const vehicle_id = cust_veh_id.split(',')[1];
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
const AddComments = async (req, res) => {
    const commentData = req.body;
    const updateResult = await orderService.addComments(commentData);
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

const getOrderComments = async (req, res) => {
    const { orderId } = req.params;
    const getComments = await orderService.getOrderComments(orderId);
    if (getComments) {
        return res.status(200).json({
            status: true,
            message: 'Comments found',
            data: getComments
        });
    } else {
        return res.status(400).json({
            status: false,
            message: 'Comments not found',
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

const updateOrderStatus = async (req, res) => {
    const statusData = req.body;
    const updateOrderStatus = await orderService.updateOrderStatus(statusData);
    if(updateOrderStatus)
    {
        return res.status(200).json({
            status: true,
            message: 'Order status updated successfully'
        })
    }
    else
    {
        return res.status(400).json({
            status: false,
            message: 'Order status not updated'
        })
    }
    
}

const getActiveOrders = async (req, res)=>{
    const {vehicleId} = req.params;
    const getActiveOrders = await orderService.getActiveOrders(vehicleId)
    console.log(getActiveOrders)
    if(getActiveOrders)
    {
        return res.status(200).json({
            status: true,
            message: 'active order found',
            data: getActiveOrders
        })
    }
    else
    {
        return res.status(400).json({
            status: false,
            message: 'active order not found!',
        })
    }
}
const getClosedOrders = async (req, res) => {
    const {vehicleId} = req.params;
    const closedOrders = await orderService.getClosedOrders(vehicleId);
    // console.log(closedOrders);
    if(closedOrders)
    {
        res.status(200).json({
            status: true,
            data: closedOrders
        })
    }
    else
    {
        res.status(400).json({
            status: false,
            message: 'This vehicle of a customer has not closed orders!'
        })
    }
}
const getClosedOrdersComments  = async (req, res) => {
    const {vehicleId} = req.params;

    const getClosedOrdersComments = await orderService.getClosedOrdersComments(vehicleId);
    if(getClosedOrdersComments)
    {
        return res.status(200).json({
            status: true,
            data: getClosedOrdersComments
        })
    }
    else
    {
        res.status(400).json({
            status: false,
            message: `comments for vehicle ${vehicleId} not found`
        })
    }

}
const orderController = {
    getOrder,
    getOrders,
    getOrderById,
    AddComments,
    getOrderComments,
    getOrderAdditionalRequest,
    addAdditionalRequest,
    updateOrderStatus,
    getActiveOrders,
    getClosedOrders,
    getClosedOrdersComments
}

module.exports = orderController;