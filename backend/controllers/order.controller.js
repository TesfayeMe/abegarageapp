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
const updateOrder = async (req, res) => {
    const { order_id } = req.params;
    const { orderColumn } = req.params;
    const { noteContent } = req.body;
    const updateResult = await orderService.updateOrder(order_id, noteContent, orderColumn);
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


const orderController = {
    getOrder,
    getOrders,
    getOrderById,
    updateOrder
}

module.exports = orderController;