const conn = require('../config/db.config');
const addService = async (serviceData) => {
    
    try {
     const sqlAddservice = 'insert into common_services( service_name, service_description, employee_id) values(?,?,?)';
     const [result] = await conn.query(sqlAddservice, [serviceData.service_name, serviceData.service_description, serviceData.employee_id]);
    //  console.log(result.insertId);
     return result.affectedRows > 0 ? result : null

    } catch (error) {
        console.log(error);
    }
}
const getAllServices = async () => {
    const sqlAllServices = 'SELECT * FROM `common_services`'
const allServices = await conn.query(sqlAllServices);
// console.log(allServices);
return allServices.length > 0 ? allServices : null
    
}

const getServiceById = async (service_id) => {
    const serviceSql = 'select service_id, service_name, service_description  from common_services where  service_id =?';
    const [serviceResult] = await conn.query(serviceSql, [service_id]);
    // console.log(serviceResult);
    return serviceResult.length > 0 ? serviceResult[0] : null 
}

const updateService = async (dataToUpdate) => {
    const {service_id, service_name, service_description} =dataToUpdate;
    const serviceUpdateSql = 'update common_services set service_name = ?, service_description = ? where service_id = ? '
    const [updateResult] = await conn.query(serviceUpdateSql, [service_name, service_description, service_id]);
    // console.log(updateResult.affectedRows);
    return updateResult.affectedRows > 0 ? updateResult.affectedRows : null;
}
const deleteService = async(service_id)=>{
    //delete order_status with order id and service_id order_info_id matched to order_inof,
    //in order to delete orderid=serviceid=orderinfoid

}
module.exports = {
    addService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
}