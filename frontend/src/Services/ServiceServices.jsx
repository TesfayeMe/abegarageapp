const apiUrl = import.meta.env.VITE_APP_API_URL;
const addServices = async (serviceData, loginEmployeeToken) => {
    // console.log(serviceData);
    // console.log(loginEmployeeToken);
    const requestOption = {
        'Content-Type': 'application/json',
        'x-access-token': loginEmployeeToken
    }
    const response = await fetch(`${apiUrl}/api/add-service`,{
    method: 'POST',
    headers: requestOption,
    body: JSON.stringify(serviceData),
  })
  console.log(response);
  return response
}
const getServices = async (loginEmployeeToken) =>{
    // console.log(loginEmployeeToken);
      const response = await fetch(`${apiUrl}/api/services`, {
    method: 'get',
    headers: {
       'Content-Type': 'application/json',
        'x-access-token': loginEmployeeToken
    }
})
return response;
}
const getServiceById = async (service_id, loginEmployeeToken) => {
const requestOption = {
    'Content-Type': 'application/json',
    'x-access-token': loginEmployeeToken
}
const response = await fetch(`${apiUrl}/api/service/${service_id}`, {
    method:'get',
    headers: requestOption
})
    return response;
}

const updateService = async (selectedService, loginEmployeeToken) => {
    const requestOption = {
        'Content-Type': 'application/json',
        'x-access-token': loginEmployeeToken
    }
    const response = await fetch(`${apiUrl}/api/edit-service`,{
        method: 'put',
        headers: requestOption,
        body: JSON.stringify(selectedService)
    })
    return response;
}
const deleteService = async (serviceIdDelete, loginEmployeeToken) =>{
   const response = await fetch(`${apiUrl}/api/service-delete/${serviceIdDelete}`,
    {
       method: 'put',
       headers: {
        'Content-Type': 'application/json',
        'x-access-token': loginEmployeeToken
       } 
    }
)
return response;
}

const RestoreDeletedService = async (serviceIdRestore, loginEmployeeToken) =>{
    const response = await fetch(`${apiUrl}/api/service-restore/${serviceIdRestore}`,
     {
        method: 'put',
        headers: {
         'Content-Type': 'application/json',
            'x-access-token': loginEmployeeToken
        } 
     }
 )
 return response;
 }
const ServiceServices = {
    addServices,
    getServices,
    getServiceById,
    updateService,
    deleteService,
    RestoreDeletedService
}
export default ServiceServices