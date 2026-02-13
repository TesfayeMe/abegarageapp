const vehicleService = require('../services/vehicle.services');
const addVehicle = async (req, res) => {
    const vehicleInfo = req.body;
    // console.log(vehicleInfo);
    const addvehicle = await vehicleService.addVehicle(vehicleInfo);
    if (!addvehicle) {
        return res.status(400).json({
            status: false,
            message: 'Failed to add vehicle'
        })
    }
    else {
        // console.log(addvehicle)
        return res.status(200).json({
            status: true,
            message: 'Vehicle added successfully',
            data: vehicleInfo
      
          
        })
    }
}

const getVehiclesByCustomerId = async (req, res) => {
    const customerId = req.params.customerId;
    const vehicles = await vehicleService.getVehiclesByCustomerId(customerId);
    console.log(vehicles);
    if (!vehicles) {
        return res.status(404).json({
            status: false,
            message: 'No vehicles found for this customer'
        })
    }
    else {
        return res.status(200).json({
            status: true,
            message: 'Vehicles retrieved successfully',
            data: vehicles
        })
    }
}
module.exports = {
    addVehicle,
    getVehiclesByCustomerId
}