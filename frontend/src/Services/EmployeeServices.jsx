const api_url = import.meta.env.VITE_APP_API_URL;
const createEmployee = async(formData, loginEmployeeToken) => {
  // console.log(loginEmployeeToken);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','x-access-token': loginEmployeeToken },
        
        body: JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/add-employee`, requestOptions);
  return response;
}

// a function to get all employees
const getAllEmployees = async (token) => {
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
const updateEmployee = async (newEmployeeInfo, token) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'Application/json',
      'x-access-token': token
    },
    body: JSON.stringify(newEmployeeInfo)
  }
  const response = await fetch(`${api_url}/api/edit-employee`, requestOptions);
  console.log(response);
  return response;
}
const deleteEmployee = async (employee_id, token) => {
  const requestOptions = {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'Application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ employee_id })
  }
  const response = await fetch(`${api_url}/api/delete-employee/${employee_id}`, requestOptions);
  return response;
}
const EmployeeServices = {createEmployee, getAllEmployees, updateEmployee, deleteEmployee};
export default EmployeeServices