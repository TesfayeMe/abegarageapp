const apiUrl = import.meta.env.VITE_APP_API_URL;
const addServices = async (serviceData, loginEmployeeToken) => {
    console.log(serviceData);
    console.log(loginEmployeeToken);
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
const response = await fetch(`${apiUrl}/api/services`, {
    method: 'get',
    headers: {
       'Content-Type': 'application/json',
        'x-access-token': loginEmployeeToken
    }
})
return response;
}
const ServiceServices = {
    addServices,
    getServices
}
export default ServiceServices