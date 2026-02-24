const conn = require('../config/db.config')
const getOrders = async (customer_vehicle_id) => {
    const {customer_id, vehicle_id} = customer_vehicle_id;
    const orderSql = 'SELECT cust.customer_first_name, cvh.vehicle_type, cvh.vehicle_color, cvh.vehicle_tag, ord.order_date, ord.order_hash, ord_inf.additional_request, ord_st.order_status, ord_serv.service_completed, com_serv.service_name, com_serv.service_description FROM customer_info cust JOIN customer_vehicle_info cvh ON cust.customer_id = cvh.customer_id JOIN orders ord ON cvh.customer_id = ord.customer_id JOIN order_info ord_inf ON ord.order_id = ord_inf.order_id JOIN order_status ord_st ON ord.order_id = ord_st.order_id JOIN order_services ord_serv ON ord.order_id = ord_serv.order_id JOIN common_services com_serv ON ord_serv.service_id = com_serv.service_id WHERE cust.customer_id = ? AND cvh.vehicle_id = ?;' 
const [orderResult] = await conn.query(orderSql, [customer_id, vehicle_id]);
return orderResult.length > 0 ? orderResult : null
}

const orderService = {
    getOrders,
}
module.exports = orderService;