const api_url = import.meta.env.VITE_APP_API_URL;
const createEmployee = async(formData, loginEmployeeToken) => {
  // console.log(loginEmployeeToken);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','x-access-token': loginEmployeeToken },
        
        body: JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
}

// a function to get all employees
const getAllEmployees = async (token) => {
  console.log(token);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
  
}

const EmployeeServices = {createEmployee, getAllEmployees};
export default EmployeeServices