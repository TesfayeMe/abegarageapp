import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import ServiceServices from '../../../../Services/ServiceServices'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { MdRestoreFromTrash } from "react-icons/md";
import './addserviceform.css'
const AddServiceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let loginEmployeeToken = '';
  let employee_id = 0;
  const { employee } = useAuth();
  if (employee && employee?.employee_token) {
    loginEmployeeToken = employee.employee_token;
    employee_id = employee?.employee_id
  }
  // console.log(employee_id);
  // console.log(loginEmployeeToken);

  const [serviceName, setServiceName] = useState('')
  const [serviceDescription, setServiceDescription] = useState('')

  //-------------------------------------Add Service function------------------------------------------
  const handleServiceFormSubmit = async (e) => {
    e.preventDefault();
    // alert(`Form clicked and has ${serviceName} and ${serviceDescription} fields`)
    if (!serviceName.trim() || !serviceDescription.trim()) {
      alert('You have to fill all fields')
    }
    else if (serviceName.trim().length < 3) {
      alert('Service name must more than 2 letters')

    }
    else if (serviceDescription.trim().length < 5) {
      alert('Service description must more than 5 letter')
    }
    else {
      const serviceData = {
        service_name: serviceName,
        service_description: serviceDescription,
        employee_id
      }
      const addService = await ServiceServices.addServices(serviceData, loginEmployeeToken);
      const serviceResponse = await addService.json();
      if (serviceResponse.status === true) {
        // alert(serviceResponse.message);
        window.location.href = '/admin/add-service'
      }

      else if (serviceResponse.status === 'tokenExpired') {
        localStorage.removeItem('employee');
        window.location.href = '/login'
      }
      else {
        alert(serviceResponse.message);
      }
    }
  }
  //---------------------------------------------------------------------------------------------------

  //-------------------------------------get All active Saved Services function------------------------
  const [savedServices, setSavedServices] = useState(null)
  useEffect(() => {
    const getService = async () => {
      // console.log(employee_id);
      const getServices = await ServiceServices.getServices(loginEmployeeToken);
      const data = await getServices.json();
      if (data.status === true) {
        setSavedServices(data.data[0])
      }
      else if (data.status === 'tokenExpired') {
        localStorage.removeItem('employee')
        window.location.href = '/login'
      }
      else {
        // alert('Please try again latter')
      }
    }
    getService();
  }, [employee_id])
  //----------------------------------------------------------------------------------------------------


  // ------------------------------------Edit Services function------------------------------------------
  const [editServiceEnabled, setEditServiceEnabled] = useState(false);
  const [selectedService, setSelectedService] = useState({})
  const handleServiceEdit = async (service_id) => {
    const getServiceById = await ServiceServices.getServiceById(service_id, loginEmployeeToken);
    const data = await getServiceById.json();
    if (data.status === true) {
      setSelectedService(data.data)
    }
    else if (data.status === 'tokenExpired') {
      localStorage.removeItem('employee');
      window.location.href = '/login';
      //  navigate("/login", { replace: true });
    }
    else if (data.status === 'notAdmin') {
      alert('You are not authorized for this action')
    }
    else if (data.status === false) {
      alert('Service not found')
    }

  }
  //------------------------------------------------------------------------------------------------------



  //------------------------------------Save Edited Service function--------------------------------------
  const handleServiceSaveChange = async (e) => {
    e.preventDefault();
    if (!selectedService.service_name.trim() || !selectedService.service_description.trim()) {
      alert('You should fill all required fields')
    }
    else if (selectedService.service_name.trim().length < 2) {
      alert('Service name should more than 2 letters')
    } else if (selectedService.service_description.trim().length < 5) {
      alert('Service Description should more than 5 letters')
    }
    else {
      const updateService = await ServiceServices.updateService(selectedService, loginEmployeeToken);
      const updateData = await updateService.json()
      // console.log(updateData);
      if (updateData.status === true) {
        setEditServiceEnabled(!editServiceEnabled)
        // navigate('/admin/services');
        window.location.href = '/admin/services'
      }
      else if (updateData.status === 'tokenExpired') {
        localStorage.removeItem('employee')
        window.location.href = '/login'
      }
      else if (updateData.status === 'notAdmin') {

        alert('You are not authorized for this action');
      }
      else {
        alert('Service not updated please try again');
      }

    }
  }
  //------------------------------------------------------------------------------------------------------


  //------------------------------------Delete a service function-----------------------------------------
  const [deleteServiceEnabled, setDeleteServiceEnabled] = useState(false);
  const [serviceIdDelete, setServiceIdDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const handleServiceDelete = async (service_id) => {
    setServiceIdDelete(service_id);
  }
  useEffect(() => {
    async function deleteServiceFunc() {
      if (serviceIdDelete) {
        // alert(serviceIdDelete)
        const deleteService = await ServiceServices.deleteService(serviceIdDelete, loginEmployeeToken);
        const deleteResponse = await deleteService.json();
        console.log(deleteResponse);
        if (deleteResponse.status === true) {
          setDeleting(false);
          window.location.href = '/mgr/services'
        }
        else if (deleteResponse.status === 'tokenExpired') {
          setDeleting(false);
          localStorage.removeItem('employee')
          window.location.href = '/login'
        }
        else if (deleteResponse.status === 'notAdmin') {
          setDeleting(false);
          alert('Not authorized')
        }
        else {
          setDeleting(false);
          alert('Deletion failed')

        }
      }
    }

    deleteServiceFunc();
  }, [deleting])
  //-------------------------------------------------------------------------------------------------------


  //----------------------------------Restore a deleted service function-----------------------------------
  const [restoreServiceEnabled, setRestoreServiceEnabled] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [serviceIdRestore, setServiceIdRestore] = useState(null);
  const [serviceNameRestore, setServiceNameRestore] = useState(null);
  useEffect(() => {
    async function restoreService() {
      if (serviceIdRestore && restoring) {
        const restoreDeletedService = await ServiceServices.RestoreDeletedService(serviceIdRestore, loginEmployeeToken)
        const data = await restoreDeletedService.json();
        console.log(data);
        if (data.status === true) {
          setRestoring(false);
          window.location.href = '/mgr/services'
        }
        else if (data.status === 'tokenExpired') {
          setRestoring(false);
          localStorage.removeItem('employee')
          window.location.href = '/login'
        }
        else if (data.status === 'notManager') {
          setRestoring(false);
          alert('Not authorized')
        }
        else {
          setRestoring(false);
          alert('Restoring failed')

        }
        // alert(`Service id to restore is ${serviceIdRestore} and Service name is ${serviceNameRestore}`)
        setRestoring(false);
      }
      else {
        setRestoring(false);

      }
    }
    restoreService();
  }, [restoring])
  //-------------------------------------------------------------------------------------------------------

  return (
    <div className='manage-service-page'>
      <h1 style={{ fontWeight: '700', margin: '10px 2px' }}>Services we provide</h1>
      <p style={{ margin: '30px 2px' }}>Bring your car to us and leave every worry behind, because from the moment you arrive, you’ll see exactly why our customers continue to place their complete trust in us year after year. We combine skilled craftsmanship, honest communication, and dependable service to ensure your vehicle receives the highest level of care. Every detail matters to us, and every customer matters even more. Experience service built on integrity, quality, and lasting relationships you can rely on forever.</p>

      <div className='manage-service-page-service-display-div' >
        {
          !savedServices ? (<div className='service-not-found-div'>Service not found</div>) : (savedServices?.map((savedService) => (
            <div key={savedService.service_id} className='single-service-service-display-div'>
              <div className='left-div'>
                <h3 style={{ fontWeight: '700' }} >{savedService.service_name}</h3>
                <p>{savedService.service_description}</p>
              </div>
              <div className='right-div'>
                <FaEdit className='edit-delete-icon' color='#3285f1' size={20} onClick={() => { handleServiceEdit(savedService.service_id); setEditServiceEnabled(!editServiceEnabled) }} />
                <MdDelete className='edit-delete-icon' color='red' size={20} onClick={() => { handleServiceDelete(savedService.service_id); setDeleteServiceEnabled(!deleteServiceEnabled) }} />
                <button
  type="button"
  disabled={savedService.service_deleted === 0}
  className="icon-button"
  onClick={() => {
    setServiceIdRestore(savedService.service_id);
    setServiceNameRestore(savedService.service_name);
    setRestoreServiceEnabled(!restoreServiceEnabled);
  }}
>
  <MdRestoreFromTrash size={20} color={savedService.service_deleted === 0 ? '#ccc' : '#3dac6b'} />
</button>
              </div>
            </div>
          )))


        }
      </div>
      {
        restoreServiceEnabled && (
          <div className='delete-service-panel-overlay'>
            <div className='delete-service-panel'>
              <h6>Restore Service <b>{serviceNameRestore}</b> ?</h6>


              <div className='service-delete-confirmation-div'>
                <button className='service-delete-confirmation-delete-btn' onClick={() => { setRestoreServiceEnabled(!restoreServiceEnabled); setRestoring(true); }}>Restore</button>
                <button className='service-delete-confirmation-cancel-btn' onClick={() => { setRestoreServiceEnabled(!restoreServiceEnabled); setRestoring(false); }}>Cancel</button>
              </div>
            </div>
          </div>
        )
      }
      {deleteServiceEnabled && (
        <div className='delete-service-panel-overlay'>
          <div className='delete-service-panel'>
            <h4>Are you sure?</h4>


            <div className='service-delete-confirmation-div'>
              <button className='service-delete-confirmation-delete-btn' onClick={() => { setDeleteServiceEnabled(!deleteServiceEnabled); setDeleting(!deleting); }}>Delete</button>
              <button className='service-delete-confirmation-cancel-btn' onClick={() => { setDeleteServiceEnabled(!deleteServiceEnabled); setDeleting(!deleting); }}>Cancel</button>
            </div>

          </div>
        </div>
      )
      }

      {
        editServiceEnabled && (<div className='edit-service-controller-overlay-div'>
          <div className='new-service-edit-modal'>
            <div className='new-service-edit-modal-header'>
              <h2>Edit service</h2>
              <IoIosClose onClick={() => setEditServiceEnabled(!editServiceEnabled)} className='close-btn-edit-service' color='red' size={30} />
            </div>
            <div className='new-service-edit-modal-form'>
              <form onSubmit={handleServiceSaveChange}>
                <div className='form-groups'>
                  <h6>Service name</h6>
                  <input type='text' value={selectedService.service_name} onChange={(e) => setSelectedService({ ...selectedService, service_name: e.target.value })} placeholder='Service name' />
                </div>
                <div className='form-groups'>
                  <h6>Service Description</h6>

                  <textarea value={selectedService.service_description} placeholder='Service Description' onChange={(e) => setSelectedService({ ...selectedService, service_description: e.target.value })}></textarea>
                </div>
                <div className='form-groups'>
                  <button type='submit' className='theme-btn btn-style-one'  >Save Service Change</button>
                </div>

              </form>
            </div>
          </div>


        </div>)

      }
      <div className='add-service-form-page-container'>
        <h2>Add a new service</h2>
        <br />
        <form onSubmit={handleServiceFormSubmit}>
          <div className='form-group'>
            <input type="text" placeholder='Service name' className='w-100 border' onChange={e => setServiceName(e.target.value)} />
          </div>
          <div className='form-group'>
            <input type="text" placeholder='Service Description' className='w-100 border' onChange={e => setServiceDescription(e.target.value)} />
          </div>

          <button type="submit" className='theme-btn btn-style-one'>Add Service</button>
        </form>

      </div>
    </div>
  )
}

export default AddServiceForm