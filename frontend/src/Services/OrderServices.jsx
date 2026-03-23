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
const saveNote = async (orderId, noteContent, orderColumn, employee_id, token) => {
    const commentsFor = orderColumn;
    const response = await fetch(`${api_url}/api/insert-order-comments/${orderId}/${commentsFor}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({ noteContent, employee_id })
    });
    return response;
}
const saveRelay = async (commentId, noteContent, employee_id, token) => {
    const response = await fetch(`${api_url}/api/insert-order-replays/${commentId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({ noteContent, employee_id })
    });
    return response;
}
const getAdditionalRequests = async (orderId, token) =>{
    console.log(orderId);
   const response =  await fetch(`${api_url}/api/get-order-additional-request/${orderId}`,{
    method: 'get',
    headers: {
        'Content-Type' :'application/json',
        'x-access-token': token
    }
});
return response;
}
const addNewRequest = async (additionalRequestData, token) => {
  
    const response = await fetch(`${api_url}/api/add-new-additional-request`,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(additionalRequestData)
    })
    return await response.json();
    
}
const OrderServices = {
    getOrderByVehicleId,
    getAllOrders,
    getOrderById,
    saveNote,
    saveRelay,
    getAdditionalRequests,
    addNewRequest
}
export default OrderServices