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
const getOrderById = async (orderId, token) => {
    const response = await fetch(`${api_url}/api/order/${orderId}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
    return response;
}
const saveNote = async (orderId, noteContent, orderColumn, token) => {
    const response = await fetch(`${api_url}/api/update-order/${orderId}/${orderColumn}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({ noteContent })
    });
    return response;
}
const OrderServices = {
    getOrderByVehicleId,
    getAllOrders,
    getOrderById,
    saveNote
}
export default OrderServices