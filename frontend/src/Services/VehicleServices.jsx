const apiUrl = import.meta.env.VITE_APP_API_URL;
const addVehicle = async (newVehicle, token) => {
    const response = await fetch(`${apiUrl}/api/add-vehicle`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(newVehicle)
    });
return response;
};

const getVehiclesByCustomerId = async (customerId, token) => {
    const response = await fetch(`${apiUrl}/api/vehicles/${customerId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-access-token': token
        }
    });
    const vehicleData = await response.json();
    console.log(vehicleData.data);
    return vehicleData;
}
const VehicleServices = {
    addVehicle,
    getVehiclesByCustomerId
}
export default VehicleServices;