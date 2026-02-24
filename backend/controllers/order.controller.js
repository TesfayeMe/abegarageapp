const orderService = require('../services/order.services')
const getOrders = async (req, res, next) => {
    // const customer_vehicle_id = req.body;
    const { cust_veh_id } = req.params;
    // console.log(cust_veh_id)
    const customer_id = cust_veh_id.split(',')[0];
    const vehicle_id = cust_veh_id.split(',')[1];
    // console.log(customer_id)
    // console.log(vehicle_id)
    const customer_vehicle_id = { customer_id: customer_id, vehicle_id: vehicle_id };
    const getOrder = await orderService.getOrders(customer_vehicle_id);
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

const orderController = {
    getOrders,
}

module.exports = orderController;