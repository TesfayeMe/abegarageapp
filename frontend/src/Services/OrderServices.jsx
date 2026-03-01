const api_url = import.meta.env.VITE_APP_API_URL;
const getOrderByVehicleId = async (searchData, token) => {
    console.log(searchData)
    const [ customerId, vehicleId ] = searchData
    let concatnatedIds = customerId + ',' + vehicleId;
    console.log(concatnatedIds)
    const response = await fetch(`${api_url}/api/orders/${concatnatedIds}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
    return response;
}
const getAllOrders = async (token)=>{
    
const response = await fetch(`${api_url}/api/get-services`,{
method: 'get',
headers: {
    'Content-Type': 'application/json',
    'x-access-token': token
}
})
// console.log(response)
return response;
}
const OrderServices = {
    getOrderByVehicleId,
    getAllOrders
}
export default OrderServices