import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import ServiceServices from '../../../../Services/ServiceServices'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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
  // alert(`Form clicked and has ${serviceName} and ${serviceDescription} fields`)
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
// alert(serviceResponse.message);
window.location.href = '/admin/add-service'
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
const [savedServices, setSavedServices] = useState(null) 
useEffect(()=>{
const getService = async () => {
  // console.log(employee_id);
  const getServices = await ServiceServices.getServices(loginEmployeeToken);
  const data = await getServices.json();
  if(data.status === true)
    {
setSavedServices(data.data[0])
    } 
    else if(data.status === 'tokenExpired')
    {
      localStorage.removeItem('employee')
window.location.href = '/login'
    }
    else
    {
      // alert('Please try again latter')
    } 
}
getService();
}, [employee_id])
const handleServiceEdit = ()=>{
  alert('edit')
}
const handleServiceDelete = ()=>{
  alert('delete')
}
  return (
    <div className='manage-service-page'>
      <h1 style={{fontWeight: '700', margin: '10px 2px'}}>Services we provide</h1>
      <p style={{ margin: '30px 2px'}}>Bring your car to us and leave every worry behind, because from the moment you arrive, you’ll see exactly why our customers continue to place their complete trust in us year after year. We combine skilled craftsmanship, honest communication, and dependable service to ensure your vehicle receives the highest level of care. Every detail matters to us, and every customer matters even more. Experience service built on integrity, quality, and lasting relationships you can rely on forever.</p>
      
 <div className='manage-service-page-service-display-div' >
  {
       savedServices?.map((savedService, service_id)=>(
<div key={service_id} className='single-service-service-display-div'>
<div className='left-div'>
<h3 style={{fontWeight: '700'}} >{savedService.service_name}</h3>
<p>{savedService.service_description}</p>
</div>
<div className='right-div'>
  <FaEdit className='edit-delete-icon' color='red' size={20} onClick={handleServiceEdit}/>   
  <MdDelete className='edit-delete-icon' size={20} onClick={handleServiceDelete}/>

</div>
</div>
       ))
            
      }
    </div>
      
    
       <div className='add-service-form-page-container'>
    <h2>Add a new service</h2>
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
    </div>
  )
}

export default AddServiceForm