const apiUrl = import.meta.env.VITE_API_URL;;
import React,{useState, useEffect} from 'react'
import './CustomerProfileView.css'
import { FaEdit } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { RiCloseFill } from "react-icons/ri";
import CustomerService from '../../../../Services/CustomerServices';
import { useAuth } from '../../../../Context/AuthContext';
import VehicleServices from '../../../../Services/VehicleServices';
const CustomerProfileView = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const customerId = location.state?.customer_id;
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-1234",
    active: true
  });
  const [vehicleData, setVehicleData] = useState([]);
  const [orderData, setOrderData] =  useState([
    {
      orderId: 12345,
      date: "2024-06-01",
      orderDetails: "Oil change, Tire rotation",
      status: "Completed"
    },

  ]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [oilChange, setOilChange] = useState(false);
  const [spark, setSpark] = useState(false);
  const [fuelCup, setFuelCup] = useState(false);
  const [oxygenSensor, setOxygenSensor] = useState(false);
  const [brakeWork, setBrakeWork] = useState(false);
  const [tireRelated, setTireRelated] = useState(false);
  const [ignitionSystem, setIgnitionSystem] = useState(false);
  const [cameraSoftware, setCameraSoftware] = useState(false);

 const [carYear, setCarYear] = useState('');
 const [carMake, setCarMake] = useState('');
 const [carModel, setCarModel] = useState('');
 const [carType, setCarType] = useState('');
 const [carMileage, setCarMileage] = useState('');
 const [carTag, setCarTag] = useState('');
 const [carSerial, setCarSerial] = useState('');
 const [carColor, setCarColor] = useState('');


const [vehicleId, setVehicleId] = useState(null);

 const { employee } = useAuth();
 let token = null;
 if (employee) {
   token = employee.employee_token;
      }
const addNewOrder = (vehicleId) => {
  console.log(vehicleId);
  if(vehicleId) {

  alert(`Add new order for vehicle ID: ${vehicleId}`);
  } else {
    // alert("Please select a vehicle to add an order.");
  }
}
useEffect(() => {
  
  async function  getCustDatas() {
    // console.log(customerId);
    // console.log(token);
    const customerById = await CustomerService.getCustomerById(customerId, token);
    if(customerById.status === false) {
      // console.log(customerById.message);
      window.location.href = '/admin/customers';
    }
    else if(customerById.status === 'tokenExpired' || customerById.message === 'tokenExpired!') {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('employeeToken');
      window.location.href = '/login';
    }
    else if(customerById.status === true && customerById.data) {
      // console.log(customerById.data);
      setCustomerData(customerById.data);
    }
    
  }
  getCustDatas();
},[customerId]);

useEffect(()=>{
  function checkModalView() {
    if(showNewOrderModal) {
      setOilChange(false);
      setSpark(false);
      setFuelCup(false);
      setOxygenSensor(false);
      setBrakeWork(false);
      setTireRelated(false);
      setIgnitionSystem(false);
      setCameraSoftware(false);
}
  }
  checkModalView();

},[showNewOrderModal])
const editCustHandler = (customerId) => () => {
  
  // alert(`Edit customer with ID: ${customerId}`);
  navigate('/admin/edit-customer', { state: { customer_id: customerId } });
}


 const handleVehicleSubmit = async (e) => {
   e.preventDefault();

  const newVehicle = {
    customerId: customerId,
    year: carYear,
    make: carMake,
    model: carModel,
    type: carType,
    mileage: carMileage,
    tag: carTag,
    serial: carSerial,
    color: carColor,
  };

  // 1. Uniform Validation (Check for empty fields)
  const isFormIncomplete = !carYear || !carMake.trim() || !carModel.trim() || !carType.trim() || !carMileage || !carTag.trim() || !carSerial.trim() || !carColor.trim();
  
  if (isFormIncomplete) {
    alert('Please fill in all vehicle fields');
    return;
  }

  // 2. Range Validation
  if (carYear < 1886 || carYear > new Date().getFullYear() + 1) {
    alert('Please enter a valid year');
    return;
  }

  if (isNaN(carMileage) || carMileage < 0) {
    alert('Please enter a valid mileage');
    return;
  }

  // 3. API Call
  try {
    if (selectedVehicleId) {
      // Logic for Update (if you have an update function)
      console.log('Updating existing vehicle:', selectedVehicleId);
      // const response = await VehicleServices.updateVehicle(selectedVehicleId, newVehicle, token);
    } else {
      // Logic for Add
      const response = await VehicleServices.addVehicle(newVehicle, token);
      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.status === true) {
        // alert('New vehicle added successfully!');
        // Update your UI state here
        // setVehicleData(prev => [...prev, responseData.data]);
        getVehicleData(customerId); // Refresh the vehicle list
        setAddNewVehicle(false);
      } else {
        alert(responseData.message || 'Failed to add vehicle');
      }
    }
  } catch (error) {
    console.error('Submission Error:', error);
    alert('An error occurred while saving the vehicle.');
  }
};

useEffect(() => {
  async function getVehicleData() {
    // Fetch vehicle data for the customer and update state
    const vehicleDataResponse = await VehicleServices.getVehiclesByCustomerId(customerId, token);
    if(vehicleDataResponse.status === true && vehicleDataResponse.data) {
      setVehicleData(vehicleDataResponse.data);
    }
    else if(vehicleDataResponse.status === 'tokenExpired' || vehicleDataResponse.message === 'tokenExpired!')
      {
        // alert('Session expired. Please log in again.');
        localStorage.removeItem('employeeToken');
        window.location.href = '/login';
      } else {
        // alert(vehicleDataResponse.message || 'Failed to fetch vehicle data');
        console.log(vehicleDataResponse);
      }
    }
    if (customerId) {
      getVehicleData();
    }
  }, [customerId]);
  const getVehicleData = async (customerId) => {
    alert(`Vehicle with id ${vehicleId} is on the top of the table`)
    const vehicleDataResponse = await VehicleServices.getVehiclesByCustomerId(customerId, token);
    if(vehicleDataResponse.status === true && vehicleDataResponse.data) {
    setVehicleData(vehicleDataResponse.data);
    // console.log(vehicleDataResponse.data);
  }
    else if(vehicleDataResponse.status === 'tokenExpired' || vehicleDataResponse.message === 'tokenExpired!')
      {
    alert('Session expired. Please log in again.');
    localStorage.removeItem('employeeToken');
    window.location.href = '/login';
  } else {
    alert(vehicleDataResponse.message || 'Failed to fetch vehicle data');
    console.log(vehicleDataResponse);
  }
}




useEffect(()=>{
const getFirstCarOfCustomer =()=>{
   setVehicleId(vehicleData[0]?.vehicle_id);
}
getFirstCarOfCustomer();
}, [vehicleData])
console.log('Vehicle id ',vehicleId);

useEffect(() => {
  async function getOrderData() {
    // Fetch order data for the selected vehicle and update state
  }
  if (selectedVehicleId) {
    getOrderData();
  }
}, [selectedVehicleId]);

const [servicesWithId, setServicesWithId] = useState(null);
const [serviceIDs, setServiceIDs] = useState([])
const handleServiceClick = (id) => {
    setServiceIDs((prev) => {
      const isExisting = prev.includes(Number(id));
   
      const nextIds = isExisting
        ? prev.filter((item) => item !== Number(id))
        : [...prev, Number(id)];

      // 3. Sort correctly. 
      // Using .slice().sort() or [...nextIds].sort() ensures a new reference.
      // (a, b) => a.localeCompare(b, undefined, {numeric: true}) handles "1", "2", "10" correctly.
      // return nextIds.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      return nextIds
    });
  };
  
console.log(serviceIDs);
const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;

  if (checked) {
    setServiceIDs(prev => [...prev, Number(value)]);
  } else {
    setServiceIDs(prev =>
      prev.filter((item) => item !== Number(value))
    );
  }
};


const services = [{
service_id: 1,
service_name: 'Oil change',
service_description:'Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape'
},
{
service_id: 2,
service_name: 'Spark plug replacement',
service_description:'Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape'
},{
service_id: 3,
service_name: 'Fuel cup replacement',
service_description:'Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape'
},{
service_id: 4,
service_name: 'Oil change',
service_description:'Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape'
},{
service_id: 5,
service_name: 'Oxygen sensor replacement',
service_description:'Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape'
},{
service_id: 6,
service_name: 'Brake work',
service_description:'Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape'
},{
service_id: 7,
service_name: 'Tire related work',
service_description:'Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape'
},{
service_id: 8,
service_name: 'Ignition system work',
service_description:'Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape'
},
]
const handleServiceOrder = (e)=>{
e.preventDefault();
alert(`Save ${serviceIDs}`)
}
  return (
    <div className='customer-profile-view-container'>
      <div className='customer-profile-vertical-line'>
      </div>
      <div className='customer-profile-view-right'>
<div className='customer-profile-view-right-customer-details'>
  <div className='customer-profile-view-right-pointer-circle'>
<span className='customer-profile-view-right-customer-pointer-circle-inner'>
  Info 
</span>
  </div>
  <div className='customer-profile-view-right-customer-details-content'>

<p><h5><strong>Customer: {customerData.customer_first_name} {customerData.customer_last_name}</strong></h5></p>
<span> <strong>Email:</strong> {customerData.customer_email}</span><br/>
<span> <strong>Phone Number:</strong> {customerData.customer_phone_number}</span><br/>
<span> <strong>Active Customer:</strong> {customerData.active_customer_status ? "Yes" : "No"}</span><br/>
<span> <strong>Edit customer info:</strong> <FaEdit className="customer-profile-view-right-edit-icon" color="#EE0D0A" onClick={editCustHandler(customerId)} /></span><br/>

  </div>
</div>
<div className='customer-profile-view-right-vehicle-details'>
  <div className='customer-profile-view-right-pointer-circle'>
<span className='customer-profile-view-right-vehicle-pointer-circle-inner'>
  Cars
</span>
  </div>
  <div className='customer-profile-view-right-vehicle-details-content'>
    
<p><strong>Vehicle of {customerData.customer_first_name} :</strong></p>
{vehicleData.length === 0 ? (
  <div className='message-of-no-vehicle-found'>
      <span>No vehicle found</span>
    </div>
  ) : (
    vehicleData.map((vehicle) => (
      <div key={vehicle.vehicleId} className={`vehicle-info-card ${vehicleId===vehicle.vehicle_id ? 'selected' : ''}` } onClick={() => setVehicleId(vehicle.vehicle_id)}>
        <span><strong>Year:</strong> {vehicle.vehicle_year}</span>
        <span><strong>Make:</strong> {vehicle.vehicle_make}</span>
        <span><strong>Model:</strong> {vehicle.vehicle_model}</span>
        <span><strong>Type:</strong> {vehicle.vehicle_type}</span>
        <span><strong>Mileage:</strong> {vehicle.vehicle_mileage}</span>
      </div>
    ))
  )}
{!addNewVehicle && (
<button className='theme-btn btn-style-one' onClick={() => setAddNewVehicle(true)}>Add new vehicle</button>
)}

{addNewVehicle && (
<div className='new-vehicle-form-div'>
  <div className='form-close-btn' onClick={() => setAddNewVehicle(false)}>
<RiCloseFill className='form-close-icon' size={35} color='#fff' />
  </div>
  <form className='new-vehicle-form' onSubmit={handleVehicleSubmit}>
    <h1 style={{padding: '20px 10px'}}>Add New Vehicle</h1>
     <div className='form-group col-md-12'>
    <input type="number" id="year" name="year" placeholder='Year' onChange={e=>setCarYear(e.target.value)}  required />
    </div>
    <div className='form-group col-md-12'>

    <input type="text" id="make" name="make"  placeholder='Make' onChange={e=>setCarMake(e.target.value)} required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="model" name="model" placeholder='Model' onChange={e=>setCarModel(e.target.value)} required />
    </div>
   
    <div className='form-group col-md-12'>
    <input type="text" id="type" name="type" placeholder='Type' onChange={e=>setCarType(e.target.value)} required />
    </div>
    <div className='form-group col-md-12'>
    <input type="number" id="mileage" name="mileage" placeholder='Mileage' onChange={e=>setCarMileage(e.target.value)} required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="tag" name="tag" placeholder='tag' onChange={e=>setCarTag(e.target.value)} required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="serial" name="serial" placeholder='Serial Number' onChange={e=>setCarSerial(e.target.value)} required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="color" name="color" placeholder='Color' onChange={e=>setCarColor(e.target.value)} required />
    </div>
    <div className='form-group col-md-12'>
    <button type="submit" className='theme-btn btn-style-one add-vehicle-btn' >Add Vehicle</button>
</div>
    </form>

</div>)}
  </div>
</div>


<div className='customer-profile-view-right-order-details'>
  <div className='customer-profile-view-right-pointer-circle-end'>
<div className='customer-profile-view-right-order-pointer-circle-inner'>
  Orders
</div>
  </div>
  <div>
     
  {orderData.length === 0 ? (
    <div>
      <h2>Orders</h2><br/>
      <div className='message-of-no-vehicle-found'>
        <span>No order found for customer {customerId} with vehicle {'selectedVehicleId'}</span>
      </div>
    </div>
  ) : (
    orderData.map((order) => (
      <div key={order.orderId} className='customer-profile-view-right-order-details-content'>
       <h2>Orders</h2>
        <span><strong>Order ID:</strong> {order.orderId}</span><br/>
        <span><strong>Date:</strong> {order.date}</span><br/>
        <span><strong>Details:</strong> {order.orderDetails}</span><br/>
        <span><strong>Status:</strong> {order.status}</span>
      </div>
    ))
    
  )}
 
 {!showNewOrderModal && <button className='theme-btn btn-style-one' style={{margin: '20px 0'}} onClick={()=>{addNewOrder(selectedVehicleId);setShowNewOrderModal(!showNewOrderModal)}}>Add new order</button> }
  </div>

  {showNewOrderModal && vehicleId && 
  
  (
<div className='new-order-modal-overlay'>
  <div className='new-order-modal'>
    <button className='close-modal-btn' onClick={() => {setShowNewOrderModal(false); setServiceIDs([]);} }>
 <RiCloseFill className='close-modal-icon' size={35} color='#fff' />
       </button>
       <form style={{padding: '10px'}} onSubmit={handleServiceOrder}>
          <h2 style={{fontSize: '30px'}}>New order of {`${customerData.customer_first_name}'s`} car with car id {vehicleId}</h2>
        <div className='form-content-container'>
          {
            services.map((service)=>(
             
<div className='form-group col-md-12 service-list-texts-checkboxes' key={service.service_id}>
            <div  className='service-list-texts' style={{width: '100%'}} onClick={() => handleServiceClick(service.service_id)} >
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
          </div>
            ))

          }
          <div className='add-order-btn-and-additional-request-and-price-div' style={{backgroundColor: 'white'}}>
            <div className='additional-request-textarea-div'>
              <h2>Additional request</h2>
<textarea className='additional-request-textarea' placeholder='Service request'></textarea>
            </div>
            <div className='price-of-service'>
              <input type='number' placeholder='Price' />
            </div>
            <button type='submit' className='theme-btn btn-style-one'  >Save order</button>
          </div>
        </div>
       </form>
    </div>

</div>

  )
  
  }


 
  

      </div>
     </div>
      
      </div>
  )
}

export default CustomerProfileView;