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
const saveNote = async (commentData, token) => {
    const response = await fetch(`${api_url}/api/add-order-comments`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(commentData)
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
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(additionalRequestData)
    })
    return await response.json();
    
}
const getOrderNotes = async (orderId, token) => {
    const response = await fetch(`${api_url}/api/get-order-notes/${orderId}`,{
        method: 'get',
        headers : {
            'content-type': 'application/json',
            'x-access-token' : token
        }
    })
    return response;
}
const updateOrderStatus = async (statusData, token) => {
    const response = await fetch(`${api_url}/api/update-order-status`, {
        method: 'put',
        headers : {
            'content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(statusData)
    })
    return await response.json();
}
const getActiveOrders = async (vehicleId, loginEmployeeToken) =>{
  const response = await fetch(`${api_url}/api/get-active-orders/${vehicleId}`,{
    method: 'get',
    headers: {
        'content-type': 'application/json',
        'x-access-token': loginEmployeeToken
    }
})
return response;
}
const getClosedOrders = async (vehicleId, loginEmployeeToken) =>{
  const response = fetch(`${api_url}/api/get-closed-orders/${vehicleId}`,
    {
        method : 'get',
        headers: {
            'content-type': 'application/json',
            'x-access-token': loginEmployeeToken
        }
    }
)
return response;
}
const getClosedOrderComments = async (vehicleId, loginEmployeeToken) => {
    const response = await fetch(`${api_url}/api/get-closed-orders-comments/${vehicleId}`,{
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'x-access-token': loginEmployeeToken
        }
    });

    return response;

}
const OrderServices = {
    getOrderByVehicleId,
    getAllOrders,
    getOrderById,
    saveNote,
    saveRelay,
    getAdditionalRequests,
    addNewRequest
    ,getOrderNotes,
    updateOrderStatus,
    getActiveOrders,
    getClosedOrders,
    getClosedOrderComments
}
export default OrderServices