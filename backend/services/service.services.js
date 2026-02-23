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
module.exports = {
    addService,
    getAllServices
}