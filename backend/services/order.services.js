const conn = require('../config/db.config')
const getOrder = async (customer_vehicle_id) => {
    const { customer_id, vehicle_id } = customer_vehicle_id;
    
    const orderSql = `SELECT cvh.vehicle_type, cvh.vehicle_color, cvh.vehicle_tag, ord.order_date, ord_inf.additional_request, ord_st.order_status, GROUP_CONCAT(com_serv.service_name SEPARATOR ', ') AS service_names FROM customer_info cust JOIN customer_vehicle_info cvh ON cust.customer_id = cvh.customer_id JOIN orders ord ON cvh.vehicle_id = ord.vehicle_id JOIN order_info ord_inf ON ord.order_id = ord_inf.order_id JOIN order_status ord_st ON ord.order_id = ord_st.order_id JOIN order_services ord_serv ON ord.order_id = ord_serv.order_id JOIN common_services com_serv ON ord_serv.service_id = com_serv.service_id WHERE cust.customer_id = ? AND cvh.vehicle_id = ? GROUP BY ord.order_id, cust.customer_first_name, cvh.vehicle_type, cvh.vehicle_color, cvh.vehicle_tag, ord.order_date, ord.order_hash, ord_inf.additional_request, ord_st.order_status;`
    const [orderResult] = await conn.query(orderSql, [customer_id, vehicle_id]);
    console.log(orderResult);
    return orderResult.length > 0 ? orderResult : null
}
const getOrders = async () => {
    const ordersSql = `select cinfo.customer_first_name, cinfo.customer_last_name, cident.customer_email, cident.customer_phone_number, c_v_info.vehicle_make, c_v_info.vehicle_model, c_v_info.vehicle_year, c_v_info.vehicle_tag, ord.order_id, ord.order_date, crole.company_role_name, emp_info.employee_first_name, ord_stat.order_status from company_roles crole JOIN employee_role emproles ON crole.company_role_id = emproles.company_role_id JOIN employee emp ON emproles.employee_id = emp.employee_id JOIN employee_info emp_info ON emp.employee_id = emp_info.employee_id JOIN orders ord ON emp.employee_id = ord.employee_id JOIN order_info ord_info ON ord.order_id = ord_info.order_id JOIN order_status ord_stat ON ord.order_id = ord_stat.order_id JOIN customer_identifier cident ON ord.customer_id = cident.customer_id JOIN customer_info cinfo ON cident.customer_id = cinfo.customer_id JOIN customer_vehicle_info c_v_info ON cident.customer_id = c_v_info.customer_id;`;
    const [ordersResult] = await conn.query(ordersSql);
    // console.log(ordersResult);
    return ordersResult.length > 0 ? ordersResult : null;

}
const orderService = {
    getOrder,
    getOrders,
}
module.exports = orderService;
