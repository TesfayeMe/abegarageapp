
import './addNewOrder.css';
import { useState, useEffect } from 'react';
import CustomerServices from '../../../../Services/CustomerServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../../Context/AuthContext';
import { Table } from 'react-bootstrap';
import { FaHandPointUp } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import VehicleServices from '../../../../Services/VehicleServices';
import { RiCloseFill } from "react-icons/ri";
import ServiceServices from '../../../../Services/ServiceServices';
const AddNewOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let loginEmployeeToken = '';
    const { employee } = useAuth();
    if (employee && employee?.employee_token) {
        loginEmployeeToken = employee.employee_token;
    }
    // console.log(loginEmployeeToken);
    const [searchValue, setSearchValue] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isCustomerSelected, setIsCustomerSelected] = useState(false);
    const [isVehicleSelected, setIsVehicleSelected] = useState(false);
    const [showNewOrderModal, setShowNewOrderModal] = useState(false);


    const [services, setServices] = useState([]);
    const [serviceIDs, setServiceIDs] = useState([]);

    const [selectedCustomerVehicle, setSelectedCustomerVehicle] = useState(null);

    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    useEffect(() => {
        async function searchCustomer(searchValue) {
            console.log('serached', searchValue)
            if (!searchValue) {
                setSearchResults([]);
                return;
            }

            const searchCustomerData = await CustomerServices.searchCustomers(searchValue, loginEmployeeToken);
            const customerData = await searchCustomerData.json();
            if (customerData.status === true) {
                console.log(customerData.data)
                setSearchResults(customerData.data);
            }
            else if (customerData.status === 'tokenExpired') {
                localStorage.removeItem('employee');
                window.location.href = '/login'
            }
            else {
                console.log(customerData.message)
            }
        }
        searchCustomer(searchValue);
    }, [searchValue])


    const handleRowClick = async (customer_id) => {
        // alert(customer_id)
        const selectedCustomerData = await CustomerServices.getCustomerById(customer_id, loginEmployeeToken);
        // const selectedCustomerDataJson = await selectedCustomerData.json();
        console.log(selectedCustomerData)
        if (selectedCustomerData.status === true) {
            setSelectedCustomer(selectedCustomerData.data);
            setIsCustomerSelected(true);
            setShowSearchResults(false);
        }
        else if (selectedCustomerData.status === 'tokenExpired') {
            localStorage.removeItem('employee');
            window.location.href = '/login'
        }
        else {
            console.log(selectedCustomerData.message)
        }
    }
    const closeSelectedCustomer = () => {
        setSelectedCustomer(null);
        setIsCustomerSelected(false);
        setSearchValue('');
        setSearchResults([]);
        setIsVehicleSelected(false);
        setSelectedVehicleId(null);
        setShowNewOrderModal(false);
    }
const customerEditHandler = (customerId)=>{
   
    navigate('/admin/edit-customer', { state: { customer_id: customerId } });

}
useEffect(()=>{
async function customerVehicles(selectedCustomerId){
    console.log(selectedCustomerId);
    const selectedCustomerVehicleData = await VehicleServices.getVehiclesByCustomerId(selectedCustomerId, loginEmployeeToken);
        // const selectedCustomerDataJson = await selectedCustomerVehicleData.json();
        console.log(selectedCustomerVehicleData)
        if (selectedCustomerVehicleData.status === true) {
            setSelectedCustomerVehicle(selectedCustomerVehicleData.data);
            setIsCustomerSelected(true);
            setShowSearchResults(false);
        }
        else if (selectedCustomerVehicleData.status === 'tokenExpired') {
            localStorage.removeItem('employee');
            window.location.href = '/login'
        }
        else {
            console.log(selectedCustomerVehicleData.message)
        }
    
}
if(selectedCustomerId){
    customerVehicles(selectedCustomerId);
}
}, [selectedCustomerId])



//----------------------------------------------handle service order for a selected vehicle and customer----------------------------------------------
const [additionalRequest, setAdditionalRequest] = useState('');
  const [servicePrice, setServicePrice] = useState(0);
  const handleServiceOrder = async (e) => {
    e.preventDefault();
    let totalAdditionalRequests = []
    let allAdditionalRequests = additionalRequest.split(',');
    allAdditionalRequests.forEach(request => {

      if (request.trim().length > 2) {
        totalAdditionalRequests.push(request)
      }
      else {

      }
    });
    if (serviceIDs.length < 1) {
      alert('Please Select AtLest One Service')
    }
    else if (Number(servicePrice) === 0) {
      alert("Please Add Price")
    }
    else {
      const orderServiceData = {
        employee_id: employee?.employee_id,
        customer_id: selectedCustomerId,
        vehicle_id: selectedVehicleId,
        active_order: serviceIDs.length,
        order_total_price: Number(servicePrice),
        additional_request: totalAdditionalRequests.toString(),
        active_additional_request: totalAdditionalRequests.length,
        service_ids: serviceIDs
      }
  
      try {
        const addServiceOrder = await CustomerServices.addServiceOrder(orderServiceData, loginEmployeeToken);
        const data = await addServiceOrder.json();
       
        if (data.status === true) {
          window.location.href = '/admin/orders'
        }
        else if (data.message === 'TokenExpired') {
          window.location.href = '/login'

        }
        else if (data.status === false) {
        
          console.log(data.message);
        }


      } catch (error) {
        console.log(error);
      }
    }

  }
//-----------------------------------------------------------------------------------------------------------------------------------------------------

  const handleServiceClick = async (service_id) => {
    if (serviceIDs.includes(service_id)) {
      setServiceIDs(serviceIDs.filter(id => id !== service_id));
    } else {
      setServiceIDs([...serviceIDs, service_id]);
    }
  }
  const handleCheckboxChange = (e) => {
    const service_id = parseInt(e.target.value);
    if (e.target.checked) {
      setServiceIDs([...serviceIDs, service_id]);
    } else {
      setServiceIDs(serviceIDs.filter(id => id !== service_id));
    }
  }

  useEffect(() => {
    async function fetchServices() {
      const servicesData = await ServiceServices.getServices(loginEmployeeToken);
      const servicesDataJson = await servicesData.json();
   
      if (servicesDataJson.status === true) {
        setServices(servicesDataJson.data[0]);
      }
      else if (servicesDataJson.status === 'tokenExpired') {
        localStorage.removeItem('employee');
        window.location.href = '/login'
      }
      else {
        console.log(servicesDataJson.message)
      }
    }
    fetchServices();
  }, [selectedVehicleId])




    return (
        <div className='add-new-order-page'>
            <h1>Add a new order</h1>
            {
                isCustomerSelected && selectedCustomer ? (
                    <>
                    <div className='selected-customer-info'>
                        <div className='customer-info'>
                            <h2>{selectedCustomer.customer_first_name} {selectedCustomer.customer_last_name}</h2>
                            <span><strong>Email : </strong>{selectedCustomer.customer_email}</span><br />
                            <span><strong>Phone : </strong>{selectedCustomer.customer_phone_number}</span><br />
                            <span><strong>Active customer: </strong>{selectedCustomer.active_customer_status === 1 ? 'Yes' : 'No'}</span><br/>                
                            <span><strong>Edit customer info: </strong><FaEdit className='edit-customer-icon' size={22} color='red' onClick={() => customerEditHandler(selectedCustomer.customer_id)} /></span>
                        </div>
                        <div className='close-btn-div'>
                            <button className='select-vehicle-btn' onClick={() => closeSelectedCustomer()}><IoCloseSharp /></button>
                            </div>
                    </div>
                    {
                       isVehicleSelected && selectedVehicleId ? (
                        <>
                        <div className='selected-vehicle-info'>
                            {selectedCustomerVehicle.map((vehicle) => {
                                if(vehicle.vehicle_id === selectedVehicleId){
                                    return (
                                        <div key={vehicle.vehicle_id} className='selected-vehicle-details'>
                                            <span style={{fontWeight: '700', fontSize: '28px', color: '#010F51'}}>{vehicle.vehicle_model}</span><br />
                                            <span><strong>Vehicle Year : </strong>{vehicle.vehicle_year}</span><br />
                                            
                                            <span><strong>Vehicle Tag : </strong>{vehicle.vehicle_tag}</span><br />
                                            <span><strong>Vehicle Serial : </strong>{vehicle.vehicle_serial}</span><br />
                                            <span><strong>Vehicle Color : </strong>{vehicle.vehicle_color}</span><br />
                                            <span><strong>Vehicle Mileage : </strong>{vehicle.vehicle_mileage}</span><br />
                                            <span><strong>Edit Vehicle Info : </strong><FaEdit className='edit-customer-icon' size={22} color='red' onClick={() => navigate('/admin/edit-vehicle', { state: { vehicle_id: vehicle.vehicle_id } })} /></span>
                                        </div>
                                    )
                                }
                            })}
                            <div className='close-btn-div'>
                                <button className='close-selected-vehicle-btn' onClick={() => {setIsVehicleSelected(false); setSelectedVehicleId(null)}}><IoCloseSharp /></button>
                            </div>
                        </div>

















 {
            showNewOrderModal && selectedVehicleId &&

            (
            //   <div className='new-order-modal-overlay'>
                <div className='new-order-services'>
                    <div className='add-new-order-header'>
                        <h2 style={{ fontSize: '30px' }}>New order of {`${selectedCustomer.customer_first_name}'s`} car with car id {selectedVehicleId}</h2>
                       
                        <button className='close-new-order-form-btn' onClick={() => { setShowNewOrderModal(false); setServiceIDs([]); setAdditionalRequest(''); setServicePrice(0) }}>
                    <RiCloseFill className='close-form-icon' size={30} color='#fff' />
                  </button>
                    </div>
                  
                  {services.length > 0 ? (
                    <form style={{ padding: '10px' }} onSubmit={handleServiceOrder}>
                      
                      <div className='add-new-order-form-content-container'>
                        {
                          services.map((service) => (
                            <>
                              <div className='form-group col-md-12 service-list-texts-checkboxes' key={service.service_id}>
                                <div className='service-list-texts' style={{ width: '100%' }} onClick={() => handleServiceClick(service.service_id)} >
                                  <h3 >{service.service_name}</h3>
                                  <p >{service.service_description}</p>
                                </div>
                                <div>
                                  <input
                                    type="checkbox"
                                    value={service.service_id}
                                    name={service.service_name}
                                    id={`service-checkbox-${service.service_id}`}
                                    className="service-checkboxes"
                                    checked={serviceIDs.includes(service.service_id)}
                                    onChange={handleCheckboxChange}
                                  />
                                </div>
                                <div className=''></div>
                              </div>
                              
                            </>
                          ))

                        }
<div className='add-order-btn-and-additional-request-and-price-div' style={{ backgroundColor: 'white' }}>
                                <div className='additional-request-textarea-div'>
                                  <h2>Additional request</h2>
                                  <textarea className='additional-request-textarea' placeholder='Service request' value={additionalRequest} onChange={e => setAdditionalRequest(e.target.value)} ></textarea>
                                </div>
                                <div className='price-of-service'>
                                  <input type='number' placeholder='Price' value={servicePrice} onChange={e => setServicePrice(e.target.value)} />
                                </div>
                                <button type='submit' className='theme-btn btn-style-one'  >Save order</button>
                              </div>
                      </div>
                    </form>
                  ) : (<div className='service-not-found-for-add-new-order'>Services of the garage not found, please add services first</div>)
                  }
                </div>

            //   </div>

            )

          }



































                        </>
                       ) : null

                    }
                    {
                        !isVehicleSelected && ( <div className='vehicle-lists-for-selected-customer'>
                        <h2>Vehicles for {selectedCustomer.customer_first_name} {selectedCustomer.customer_last_name}</h2>
                        {selectedCustomerVehicle && selectedCustomerVehicle.length > 0 ? (
                            
                            <Table striped bordered hover style={{ width: '97%', marginTop: '20px' }}>
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Make</th>
                                        <th>Model</th>
                                        <th>Tag</th>
                                        <th>Serial</th>
                                        <th>Color</th>
                                        <th>Mileage</th>
                                        <th>Choose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedCustomerVehicle.map((vehicle) => (
                                        <tr style={{ cursor: 'pointer' }} key={vehicle.vehicle_id} onClick={() => {setSelectedVehicleId(vehicle.vehicle_id); setShowNewOrderModal(true); setIsVehicleSelected(true)}}>
                                            <td>{vehicle.vehicle_year}</td>
                                            <td>{vehicle.vehicle_make}</td>
                                            <td>{vehicle.vehicle_model}</td>
                                            <td>{vehicle.vehicle_tag}</td>
                                            <td>{vehicle.vehicle_serial}</td>
                                            <td>{vehicle.vehicle_color}</td>
                                            <td>{vehicle.vehicle_mileage}</td>
                                            <td><FaHandPointUp /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>No vehicles found for this customer.</p>
                        )}
                    </div>)
                    }
                   
</>
                    
                    
                ) : (<di>


                    <div className="add-new-order-content">
                        <form>
                            <div className="customer-search-bar">
                                <input type="text" onChange={(e) => setSearchValue(e.target.value)} className='search-input' placeholder="Search for a customer using firstname, lastname, email address or phone number" />
                                <button type='submit' className='search-btn'>S</button>
                            </div>
                        </form>
                        {searchResults.length > 0 && (
                            <Table striped bordered hover style={{ width: '97%', marginTop: '20px' }}>
                                <tbody>
                                    {searchResults.map((customer) => (
                                        <tr style={{ cursor: 'pointer' }} key={customer.customer_id} onClick={() => {handleRowClick(customer.customer_id); setSelectedCustomerId(customer.customer_id)}}>
                                            <td>{customer.customer_first_name} {customer.customer_last_name}</td>
                                            <td>{customer.customer_email}</td>
                                            <td>{customer.customer_phone_number}</td>
                                            <td><FaHandPointUp /></td>
                                        </tr>
                                    ))}
                                </tbody>


                            </Table>
                        )}


                    </div>
                    {searchResults.length === 0 && (
                        <button type='button' className='theme-btn btn-style-one add-new-customer-btn'>Add new customer</button>
                    )}
                </di>)
            }


        </div>
    )
}

export default AddNewOrder