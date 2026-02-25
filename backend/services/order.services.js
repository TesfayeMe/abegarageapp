const conn = require('../config/db.config')
const getOrders = async (customer_vehicle_id) => {
    const {customer_id, vehicle_id} = customer_vehicle_id;
    // const orderSql = `SELECT cust.customer_first_name, cvh.vehicle_type, cvh.vehicle_color, cvh.vehicle_tag, ord.order_date, ord.order_hash, ord_inf.additional_request, ord_st.order_status, GROUP_CONCAT(com_serv.service_name SEPARATOR ', ') AS service_names, GROUP_CONCAT(com_serv.service_description SEPARATOR ' | ') AS service_descriptions FROM customer_info cust JOIN customer_vehicle_info cvh ON cust.customer_id = cvh.customer_id JOIN orders ord ON cvh.vehicle_id = ord.vehicle_id JOIN order_info ord_inf ON ord.order_id = ord_inf.order_id JOIN order_status ord_st ON ord.order_id = ord_st.order_id JOIN order_services ord_serv ON ord.order_id = ord_serv.order_id JOIN common_services com_serv ON ord_serv.service_id = com_serv.service_id WHERE cust.customer_id = ? AND cvh.vehicle_id = ? GROUP BY ord.order_id, cust.customer_first_name, cvh.vehicle_type, cvh.vehicle_color, cvh.vehicle_tag, ord.order_date, ord.order_hash, ord_inf.additional_request, ord_st.order_status;`
    const orderSql = `SELECT cvh.vehicle_type, cvh.vehicle_color, cvh.vehicle_tag, ord.order_date, ord_inf.additional_request, ord_st.order_status, GROUP_CONCAT(com_serv.service_name SEPARATOR ', ') AS service_names FROM customer_info cust JOIN customer_vehicle_info cvh ON cust.customer_id = cvh.customer_id JOIN orders ord ON cvh.vehicle_id = ord.vehicle_id JOIN order_info ord_inf ON ord.order_id = ord_inf.order_id JOIN order_status ord_st ON ord.order_id = ord_st.order_id JOIN order_services ord_serv ON ord.order_id = ord_serv.order_id JOIN common_services com_serv ON ord_serv.service_id = com_serv.service_id WHERE cust.customer_id = ? AND cvh.vehicle_id = ? GROUP BY ord.order_id, cust.customer_first_name, cvh.vehicle_type, cvh.vehicle_color, cvh.vehicle_tag, ord.order_date, ord.order_hash, ord_inf.additional_request, ord_st.order_status;`
const [orderResult] = await conn.query(orderSql, [customer_id, vehicle_id]);
console.log(orderResult);
return orderResult.length > 0 ? orderResult : null
}

const orderService = {
    getOrders,
}
module.exports = orderService;