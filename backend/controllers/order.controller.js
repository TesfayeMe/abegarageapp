const orderService = require('../services/order.services')
const getOrders =  async (req, res, next) => {
    // const customer_vehicle_id = req.body;
    const customer_vehicle_id = {customer_id: 8, vehicle_id: 10};
    const getOrder = await orderService.getOrders(customer_vehicle_id);
    if(getOrder)
    {
return res.status(200).json({
    status: true,
    message: 'Order found',
    data: getOrder[0]
})
    }
    else
    {
        return res.status(400).json({
            status: false,
            message: 'Order not found'
        })
    }
}

const orderController = {
    getOrders,
}

module.exports = orderController;