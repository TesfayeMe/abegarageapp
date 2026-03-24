const conn = require('../config/db.config')
const getOrder = async (customer_vehicle_id) => {
    const { customer_id, vehicle_id } = customer_vehicle_id;
    const orderSql = `SELECT cvh.vehicle_type, cvh.vehicle_color, cvh.vehicle_tag, ord.order_date, ord_inf.additional_request, ord_st.order_status, GROUP_CONCAT(com_serv.service_name SEPARATOR ', ') AS service_names FROM customer_info cust JOIN customer_vehicle_info cvh ON cust.customer_id = cvh.customer_id JOIN orders ord ON cvh.vehicle_id = ord.vehicle_id JOIN order_info ord_inf ON ord.order_id = ord_inf.order_id JOIN order_status ord_st ON ord.order_id = ord_st.order_id JOIN order_services ord_serv ON ord.order_id = ord_serv.order_id JOIN common_services com_serv ON ord_serv.service_id = com_serv.service_id WHERE cust.customer_id = ? AND cvh.vehicle_id = ? GROUP BY ord.order_id, cust.customer_first_name, cvh.vehicle_type, cvh.vehicle_color, cvh.vehicle_tag, ord.order_date, ord.order_hash, ord_inf.additional_request, ord_st.order_status;`
    const [orderResult] = await conn.query(orderSql, [customer_id, vehicle_id]);
    // console.log(orderResult);
    return orderResult.length > 0 ? orderResult : null
}
const getOrders = async () => {
    const ordersSql = `select cinfo.customer_first_name, cinfo.customer_last_name, cident.customer_email, cident.customer_phone_number, c_v_info.vehicle_make, c_v_info.vehicle_model, c_v_info.vehicle_year, c_v_info.vehicle_tag, ord.order_id, ord.order_date, crole.company_role_name, emp_info.employee_first_name, ord_stat.order_status from company_roles crole JOIN employee_role emproles ON crole.company_role_id = emproles.company_role_id JOIN employee emp ON emproles.employee_id = emp.employee_id JOIN employee_info emp_info ON emp.employee_id = emp_info.employee_id JOIN orders ord ON emp.employee_id = ord.employee_id JOIN order_info ord_info ON ord.order_id = ord_info.order_id JOIN order_status ord_stat ON ord.order_id = ord_stat.order_id JOIN customer_identifier cident ON ord.customer_id = cident.customer_id JOIN customer_info cinfo ON cident.customer_id = cinfo.customer_id JOIN customer_vehicle_info c_v_info ON cident.customer_id = c_v_info.customer_id;`;
    const [ordersResult] = await conn.query(ordersSql);
    // console.log(ordersResult);
    return ordersResult.length > 0 ? ordersResult : null;

}

const getOrderById = async (order_id) => {
    const orderByIdSql = `SELECT 
    ANY_VALUE(cinfo.customer_first_name) AS customer_first_name,
    ANY_VALUE(cinfo.customer_last_name) AS customer_last_name,
    ANY_VALUE(cident.customer_email) AS customer_email,
    ANY_VALUE(cident.customer_phone_number) AS customer_phone_number,
    ANY_VALUE(c_v_info.vehicle_make) AS vehicle_make,
    ANY_VALUE(c_v_info.vehicle_model) AS vehicle_model,
    ANY_VALUE(c_v_info.vehicle_year) AS vehicle_year,
    ANY_VALUE(c_v_info.vehicle_tag) AS vehicle_tag,
    ANY_VALUE(ord_info.order_total_price) AS order_total_price,
    
    -- Using ORDER BY ID inside GROUP_CONCAT to maintain chronological order
    GROUP_CONCAT(DISTINCT service.service_name SEPARATOR ', ') AS all_services,
    GROUP_CONCAT(DISTINCT com.comment_for ORDER BY com.comment_id ASC SEPARATOR ', ') AS all_comments_for,
    GROUP_CONCAT(DISTINCT com.comment ORDER BY com.comment_id ASC SEPARATOR ' | ') AS all_comments,
    GROUP_CONCAT(DISTINCT add_req.additional_request ORDER BY add_req.additional_request_id ASC SEPARATOR ' | ') AS all_additional_requests,
    GROUP_CONCAT(DISTINCT rep.replay ORDER BY rep.replay_id ASC SEPARATOR ' | ') AS all_replays,
    
    ANY_VALUE(com.comment_for) AS comment_for,
    ANY_VALUE(ord_info.additional_requests_completed) AS additional_requests_completed,
    ANY_VALUE(ord_info.active_additional_request) AS active_additional_request,
    ANY_VALUE(com.comment_id) AS comment_id,
    ANY_VALUE(com.comment_date) AS comment_date,

    ANY_VALUE(rep.replay_id) AS replay_id,
    ANY_VALUE(rep.replay) AS replay,
    ANY_VALUE(rep.replay_status) AS replay_status,
    ANY_VALUE(rep.replay_date) AS replay_date,

    ord.order_id,
    ANY_VALUE(ord.order_date) AS order_date,
    ANY_VALUE(ord.active_order) AS active_order,
    ANY_VALUE(crole.company_role_name) AS company_role_name,
    ANY_VALUE(emp_info.employee_first_name) AS employee_first_name,
    ANY_VALUE(ord_stat.order_status) AS order_status
FROM orders ord
JOIN customer_vehicle_info c_v_info ON ord.vehicle_id = c_v_info.vehicle_id 
JOIN order_info ord_info ON ord.order_id = ord_info.order_id
JOIN order_status ord_stat ON ord.order_id = ord_stat.order_id
JOIN order_services ord_serv ON ord.order_id = ord_serv.order_id
JOIN common_services service ON ord_serv.service_id = service.service_id
JOIN customer_identifier cident ON ord.customer_id = cident.customer_id
JOIN customer_info cinfo ON cident.customer_id = cinfo.customer_id
JOIN employee emp ON ord.employee_id = emp.employee_id
JOIN employee_info emp_info ON emp.employee_id = emp_info.employee_id
JOIN employee_role emproles ON emp.employee_id = emproles.employee_id
JOIN company_roles crole ON emproles.company_role_id = crole.company_role_id
LEFT JOIN additional_request add_req ON ord.order_id = add_req.order_id
LEFT JOIN comments com ON ord.order_id = com.order_id
LEFT JOIN replay rep ON com.comment_id = rep.comment_id
WHERE ord.order_id = ?
GROUP BY ord.order_id;`
//   const orderByIdSql = `SELECT 
//     ANY_VALUE(cinfo.customer_first_name) AS customer_first_name,
//     ANY_VALUE(cinfo.customer_last_name) AS customer_last_name,
//     ANY_VALUE(cident.customer_email) AS customer_email,
//     ANY_VALUE(cident.customer_phone_number) AS customer_phone_number,
//     ANY_VALUE(c_v_info.vehicle_make) AS vehicle_make,
//     ANY_VALUE(c_v_info.vehicle_model) AS vehicle_model,
//     ANY_VALUE(c_v_info.vehicle_year) AS vehicle_year,
//     ANY_VALUE(c_v_info.vehicle_tag) AS vehicle_tag,
//     ANY_VALUE(ord_info.order_total_price) AS order_total_price,
//     -- ANY_VALUE(ord_info.notes_for_internal_use) AS notes_for_internal_use,
//     -- ANY_VALUE(ord_info.notes_for_customer) AS notes_for_customer,
//     -- Aggregate the 'many' side of the relationships
//     GROUP_CONCAT(DISTINCT service.service_name SEPARATOR ', ') AS all_services,
//     GROUP_CONCAT(DISTINCT com.comment_for SEPARATOR ', ') AS all_comments_for,
//     GROUP_CONCAT(DISTINCT com.comment SEPARATOR ' | ') AS all_comments,
//     GROUP_CONCAT(DISTINCT add_req.additional_request SEPARATOR ' | ') AS all_additional_requests,
//     GROUP_CONCAT(DISTINCT rep.replay SEPARATOR ' | ') AS all_replays,
//     ANY_VALUE(com.comment_for) AS comment_for,

//     ANY_VALUE(ord_info.additional_requests_completed) AS additional_requests_completed,
//     ANY_VALUE(ord_info.active_additional_request) AS active_additional_request,
  


//     ord.order_id,
//     ANY_VALUE(ord.order_date) AS order_date,
//     ANY_VALUE(ord.active_order) AS active_order,
//     ANY_VALUE(crole.company_role_name) AS company_role_name,
//     ANY_VALUE(emp_info.employee_first_name) AS employee_first_name,
//     ANY_VALUE(ord_stat.order_status) AS order_status
// FROM orders ord
// JOIN customer_vehicle_info c_v_info ON ord.vehicle_id = c_v_info.vehicle_id 
// JOIN order_info ord_info ON ord.order_id = ord_info.order_id
// JOIN order_status ord_stat ON ord.order_id = ord_stat.order_id
// JOIN order_services ord_serv ON ord.order_id = ord_serv.order_id
// JOIN common_services service ON ord_serv.service_id = service.service_id
// JOIN customer_identifier cident ON ord.customer_id = cident.customer_id
// JOIN customer_info cinfo ON cident.customer_id = cinfo.customer_id
// JOIN employee emp ON ord.employee_id = emp.employee_id
// JOIN employee_info emp_info ON emp.employee_id = emp_info.employee_id
// JOIN employee_role emproles ON emp.employee_id = emproles.employee_id
// JOIN company_roles crole ON emproles.company_role_id = crole.company_role_id
// LEFT JOIN additional_request add_req ON ord.order_id = add_req.order_id
// LEFT JOIN comments com ON ord.order_id = com.order_id
// LEFT JOIN replay rep ON com.comment_id = rep.comment_id
// WHERE ord.order_id = ?
// GROUP BY ord.order_id;`;


//     const orderByIdSql = `SELECT 
//     cinfo.customer_first_name,
//     cinfo.customer_last_name,
//     cident.customer_email,
//     cident.customer_phone_number,
//     c_v_info.vehicle_make,
//     c_v_info.vehicle_model,
//     c_v_info.vehicle_year,
//     c_v_info.vehicle_tag,
//     ord_info.order_total_price,
//     ord_info.additional_request,
//     ord_info.active_additional_request,
//     ord_info.notes_for_internal_use,
//     ord_info.notes_for_customer,
//     ord_info.additional_requests_completed,
//     GROUP_CONCAT(service.service_name SEPARATOR ', ') AS all_services, 
//     ord.order_id,
//     ord.order_date,
//     ord.active_order,
//     crole.company_role_name,
//     emp_info.employee_first_name,
//     ord_stat.order_status
// FROM orders ord
// JOIN customer_vehicle_info c_v_info ON ord.vehicle_id = c_v_info.vehicle_id 
// JOIN order_info ord_info ON ord.order_id = ord_info.order_id
// JOIN order_status ord_stat ON ord.order_id = ord_stat.order_id
// JOIN order_services ord_serv ON ord.order_id = ord_serv.order_id
// JOIN common_services service ON ord_serv.service_id = service.service_id
// JOIN customer_identifier cident ON ord.customer_id = cident.customer_id
// JOIN customer_info cinfo ON cident.customer_id = cinfo.customer_id
// JOIN employee emp ON ord.employee_id = emp.employee_id
// JOIN employee_info emp_info ON emp.employee_id = emp_info.employee_id
// JOIN employee_role emproles ON emp.employee_id = emproles.employee_id
// JOIN company_roles crole ON emproles.company_role_id = crole.company_role_id
// WHERE ord.order_id = ?
// GROUP BY 
//     ord.order_id, cinfo.customer_first_name, cinfo.customer_last_name, 
//     cident.customer_email, cident.customer_phone_number, c_v_info.vehicle_make, 
//     c_v_info.vehicle_model, c_v_info.vehicle_year, c_v_info.vehicle_tag, 
//     ord_info.order_total_price, ord_info.additional_request, 
//     ord_info.active_additional_request, ord_info.notes_for_internal_use, 
//     ord_info.notes_for_customer, ord_info.additional_requests_completed, 
//     ord.order_date, ord.active_order, crole.company_role_name, 
//     emp_info.employee_first_name, ord_stat.order_status;`;
    const [orderByIdResult] = await conn.query(orderByIdSql, [order_id]);
    // console.log(orderByIdResult);
    return orderByIdResult.length > 0 ? orderByIdResult[0] : null;
}


const addComments = async (commentData) => {
    const { comment, employee_id, commentFor, orderId} = commentData;
    const updateNoteSql = `INSERT INTO comments (comment, employee_id, comment_for, order_id) VALUES (?, ?, ?, ?)`;
    const [updateResult] = await conn.query(updateNoteSql, [comment, employee_id, commentFor, orderId]);
    console.log(updateResult);
    return updateResult.affectedRows > 0;
}

const getOrderComments = async (orderId) => {
    const insertReplaySql = `SELECT emp_inf.employee_photo_url, emp_inf.employee_first_name, com.comment, com.comment_for, com.comment_date FROM orders ord JOIN comments com ON ord.order_id = com.order_id JOIN employee emp ON com.employee_id = emp.employee_id JOIN employee_info emp_inf ON emp.employee_id = emp_inf.employee_id WHERE ord.order_id = ? ORDER BY com.comment_date ASC;`;
    const [commentResult] = await conn.query(insertReplaySql, [orderId]);
    // console.log(commentResult);
    return commentResult.length > 0 ? commentResult : null;
}
const getOrderAdditionalRequest = async (orderId) =>{
    console.log(orderId);
    const sqlForAdditionalRequest = `SELECT adrq.additional_request, adrq.additional_request_status, adrq.total_additional_request, adrq.completed_additional_request from orders ord JOIN additional_request adrq ON ord.order_id = adrq.order_id where ord.order_id = ?`;
    const [additionalRequestResult] = await conn.query(sqlForAdditionalRequest, [orderId]);
    // console.log(additionalRequestResult);
    return additionalRequestResult.length > 0 ? additionalRequestResult : null;
}
const addAdditionalRequest = async (orderAdditionalRequestData) =>{
    const {additionalRequest, orderId, totalAdditionalRequest} = orderAdditionalRequestData;
const sqlForAddAdditionalRequest = `insert into additional_request (additional_request, order_id, total_additional_request) values(?,?,?)`;
const additionalRequestResult = await conn.query(sqlForAddAdditionalRequest, [additionalRequest, orderId, totalAdditionalRequest]);
return additionalRequestResult[0].affectedRows > 0 ? true : false;
}

const updateOrderStatus = async (statusData) => {
    const { orderStatus, orderId} = statusData;
    const sqlUpdataOrderStatus = `update order_status set order_status = ? where order_id = ?`;
    const updateResult = await conn.query(sqlUpdataOrderStatus, [orderStatus, orderId] );
      console.log(updateResult[0]);
      return updateResult[0].affectedRows > 0 ? true : false
}
const orderService = {
    getOrder,
    getOrders,
    getOrderById,
    addComments,
    getOrderComments,
    getOrderAdditionalRequest,
    addAdditionalRequest,
    updateOrderStatus
}
module.exports = orderService;
