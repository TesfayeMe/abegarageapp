const conn = require('../config/db.config');
const addVehicle = async (vehicleInfo) => {
    // const vehicleInfo = req.body;
    // console.log(vehicleInfo);
    const vehicleAddSql = 'INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [vehicleInfo.customerId, vehicleInfo.year, vehicleInfo.make, vehicleInfo.model, vehicleInfo.type, vehicleInfo.mileage, vehicleInfo.tag, vehicleInfo.serial, vehicleInfo.color];
    const [result] = await conn.query(vehicleAddSql, values);
    return result.affectedRows === 1 ? true : false;
}

const getVehiclesByCustomerId = async (customerId) => {
    const getVehiclesSql = 'SELECT * FROM customer_vehicle_info WHERE customer_id = ?';
    const [vehicles] = await conn.query(getVehiclesSql, [customerId]);
    // console.log(vehicles);
    return vehicles.length > 0 ? vehicles : null;
}
module.exports = {
    addVehicle,
    getVehiclesByCustomerId
}