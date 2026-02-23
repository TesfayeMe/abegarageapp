import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import ServiceServices from '../../../../Services/ServiceServices'
import './addserviceform.css'
const AddServiceForm =  () => {
  const navigate = useNavigate();
  const location = useLocation();
  let loginEmployeeToken = '';
  let employee_id = 0;
  const {employee} = useAuth();
  if(employee && employee?.employee_token)
  {
    loginEmployeeToken = employee.employee_token;
    employee_id = employee?.employee_id
  }
  console.log(employee_id);
  console.log(loginEmployeeToken);

const [serviceName, setServiceName] = useState('')
const [serviceDescription, setServiceDescription] = useState('')
const handleServiceFormSubmit = async (e) => {
  e.preventDefault();
  alert(`Form clicked and has ${serviceName} and ${serviceDescription} fields`)
  if(!serviceName.trim() || !serviceDescription.trim())
  {
    alert('You have to fill all fields')
  }
  else if(serviceName.trim().length < 3)
  {
    alert('Service name must more than 2 letters')

  }
  else if(serviceDescription.trim().length < 5 )
  {
    alert('Service description must more than 5 letter')
  }
  else
  {
    const serviceData = {
      service_name:serviceName,
      service_description: serviceDescription,
      employee_id
    }
    const addService = await ServiceServices.addServices(serviceData, loginEmployeeToken);
    const serviceResponse = await addService.json();
    if(serviceResponse.status === true)
    {
alert(serviceResponse.message);
window.location.href = '/admin/dashboard'
}

else if(serviceResponse.status === 'tokenExpired')
    {
      localStorage.removeItem('employee');
window.location.href = '/login'
    }
else 
  {
      alert(serviceResponse.message);
    }
}}
  return (
    <>
       <div className='add-service-form-page-container'>
    <h1>Add a new service</h1>
    <br />
    <form onSubmit={handleServiceFormSubmit}>
      <div className='form-group'>
        <input type="text" placeholder='Service name' className='w-100 border' onChange={e=>setServiceName(e.target.value)} />
      </div>
      <div className='form-group'>
        <input type="text" placeholder='Service Description' className='w-100 border' onChange={e=>setServiceDescription(e.target.value)} />
      </div>
      
      <button type="submit" className='theme-btn btn-style-one'>Add Service</button>
    </form>

    </div>
    </>
  )
}

export default AddServiceForm