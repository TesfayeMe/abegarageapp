const apiUrl = import.meta.env.VITE_API_URL;;
import React,{useState, useEffect} from 'react'
import './CustomerProfileView.css'
import { FaEdit } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { RiCloseFill } from "react-icons/ri";
import CustomerService from '../../../../Services/CustomerServices';
const CustomerProfileView = (props) => {
  const location = useLocation();
  const customerId = location.state?.customer_id;
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-1234",
    active: true
  });
  const [vehicleData, setVehicleData] = useState([
    {
      vehicleId: 1,
      year: 2020,
      make: "Toyota",
      model: "Camry",
      type: "Sedan",
      mileage: 15000,
      tag: "ABC123",
      serial: "1HGCM82633A004352",
      color: "Blue"
    },
{
  vehicleId: 2,
      year: 2020,
      make: "Toyota",
      model: "Camry",
      type: "Sedan",
      mileage: 15000,
      tag: "ABC123",
      serial: "1HGCM82633A004352",
      color: "Blue"
    },
  ]);
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
const addNewOrder = (vehicleId) => {
  if(vehicleId) {

  // alert(`Add new order for vehicle ID: ${vehicleId}`);
  } else {
    // alert("Please select a vehicle to add an order.");
  }
}
useEffect(() => {
  // Fetch customer data based on customerId
  // Example: fetch(`${apiUrl}/api/customer/${customerId}`)
  //   .then(response => response.json())
  //   .then(data => setCustomerData(data))
  //   .catch(error => console.error('Error fetching customer data:', error));
  const customerdata =  CustomerService.getCustomer(customerId)
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

<p><h5><strong>Customer: {customerId}</strong></h5></p>
<span> <strong>Email:</strong> john.doe@example.com</span><br/>
<span> <strong>Phone Number:</strong> 555-1234</span><br/>
<span> <strong>Active Customer:</strong> Yes</span><br/>
<span> <strong>Edit customer info:</strong> <FaEdit className="customer-profile-view-right-edit-icon" color="#EE0D0A" /></span><br/>

  </div>
</div>
<div className='customer-profile-view-right-vehicle-details'>
  <div className='customer-profile-view-right-pointer-circle'>
<span className='customer-profile-view-right-vehicle-pointer-circle-inner'>
  Cars
</span>
  </div>
  <div className='customer-profile-view-right-vehicle-details-content'>
    
<p><strong>Vehicle of Tesfaye:</strong></p>
{vehicleData.length === 0 ? (
  <div className='message-of-no-vehicle-found'>
      <span>No vehicle found</span>
    </div>
  ) : (
    vehicleData.map((vehicle) => (
      <div key={vehicle.vehicleId} className='vehicle-info-card' onClick={() => setSelectedVehicleId(vehicle.vehicleId)}>
        <span><strong>Year:</strong> {vehicle.year}</span>
        <span><strong>Make:</strong> {vehicle.make}</span>
        <span><strong>Model:</strong> {vehicle.model}</span>
        <span><strong>Type:</strong> {vehicle.type}</span>
        <span><strong>Mileage:</strong> {vehicle.mileage}</span>
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
  <form className='new-vehicle-form'>
    <h1 style={{padding: '20px 10px'}}>Add New Vehicle</h1>
     <div className='form-group col-md-12'>
    <input type="number" id="year" name="year" placeholder='Year'  required />
    </div>
    <div className='form-group col-md-12'>

    <input type="text" id="make" name="make"  placeholder='Make'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="model" name="model" placeholder='Model' required />
    </div>
   
    <div className='form-group col-md-12'>
    <input type="text" id="type" name="type" placeholder='Type'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="number" id="mileage" name="mileage" placeholder='Mileage'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="tag" name="tag" placeholder='tag'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="serial" name="serial" placeholder='Serial Number'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="color" name="color" placeholder='Color'  required />
    </div>
    <div className='form-group col-md-12'>
    <button type="submit" className='theme-btn btn-style-one add-vehicle-btn'>Add Vehicle</button>
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
 <button className='theme-btn btn-style-one' style={{margin: '20px 0'}} onClick={()=>{addNewOrder(selectedVehicleId);setShowNewOrderModal(true)}}>Add new order</button>
  </div>

  {showNewOrderModal && (
    <div className='new-order-modal-overlay'>

  
  <div className='new-order-modal'>
      <button className='close-modal-btn' onClick={() => setShowNewOrderModal(false)}>
<RiCloseFill className='close-modal-icon' size={35} color='#fff' />
      </button>
  
<h2 style={{padding: '10px'}}>
  Choose service
</h2>
<form style={{padding: '10px'}}>

<div className='form-content-container'>


<div className='form-group col-md-12 service-list-texts-checkboxes' onClick={() => setOilChange(!oilChange)}>
<div  className='service-list-texts'>
  <h3 >Oil change</h3>
<p >Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape</p>
</div>
<div>
  <input type='checkbox' name='oil-change' id='oil-change' className='service-checkboxes' checked={oilChange} onChange={() => setOilChange(!oilChange)}/>
</div>
  </div>


<div className='form-group col-md-12 service-list-texts-checkboxes' onClick={() => setSpark(!spark)}>
<div  className='service-list-texts'>
  <h3 >Spark plug replacement</h3>
<p >Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape</p>
</div>
<div>
  <input type='checkbox' name='spark-plug-replacement' id='spark-plug-replacement' className='service-checkboxes' checked={spark} onChange={() => setSpark(!spark)}/>
</div>
  </div>



  <div className='form-group col-md-12 service-list-texts-checkboxes' onClick={() => setFuelCup(!fuelCup)}>
<div  className='service-list-texts'>
  <h3 >Fuel cup replacement</h3>
<p >Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape</p>
</div>
<div>
  <input type='checkbox' name='fuel-cup-replacement' id='fuel-cup-replacement' className='service-checkboxes' checked={fuelCup} onChange={() => setFuelCup(!fuelCup)}/>
</div>
  </div>



  <div className='form-group col-md-12 service-list-texts-checkboxes' onClick={() => setOxygenSensor(!oxygenSensor)}>
<div  className='service-list-texts'>
  <h3 >Oxygen sensor replacement</h3>
<p >Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape</p>
</div>
<div>
  <input type='checkbox' name='oxygen-sensor-replacement' id='oxygen-sensor-replacement' className='service-checkboxes' checked={oxygenSensor} onChange={() => setOxygenSensor(!oxygenSensor)}/>
</div>
  </div>


  <div className='form-group col-md-12 service-list-texts-checkboxes' onClick={() => setBrakeWork(!brakeWork)}>
<div  className='service-list-texts'>
  <h3 >Brake work</h3>
<p >Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape</p>
</div>
<div>
  <input type='checkbox' name='brake-work' id='brake-work' className='service-checkboxes' checked={brakeWork} onChange={() => setBrakeWork(!brakeWork)}/>
</div>
  </div>


<div className='form-group col-md-12 service-list-texts-checkboxes' onClick={() => setTireRelated(!tireRelated)}>
<div  className='service-list-texts'>
  <h3 >Tire related work</h3>
<p >Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape</p>
</div>
<div>
  <input type='checkbox' name='tire-related-work' id='tire-related-work' className='service-checkboxes' checked={tireRelated} onChange={() => setTireRelated(!tireRelated)}/>
</div>
  </div>


  <div className='form-group col-md-12 service-list-texts-checkboxes' onClick={() => setIgnitionSystem(!ignitionSystem)}>
<div  className='service-list-texts'>
  <h3 >Ignition system work</h3>
<p >Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape</p>
</div>
<div>
  <input type='checkbox' name='ignition-system-work' id='ignition-system-work' className='service-checkboxes' checked={ignitionSystem} onChange={() => setIgnitionSystem(!ignitionSystem)}/>
</div>
  </div>


  <div className='form-group col-md-12 service-list-texts-checkboxes' onClick={() => setCameraSoftware(!cameraSoftware)}>
<div  className='service-list-texts'>
  <h3 >Camera software update</h3>
<p >Every 5000 kilometer or so, you need to change the oil in your car to keep your engine in the best possible shape</p>
</div>
<div>
  <input type='checkbox' name='camera-software-update' id='camera-software-update' className='service-checkboxes' checked={cameraSoftware} onChange={() => setCameraSoftware(!cameraSoftware)}/>
</div>
  </div>


</div>
<button className='theme-btn btn-style-one' style={{margin: '20px 0'}} onClick={() => setShowNewOrderModal(false)}>Add Order</button>
</form>
     </div>
</div>
  )}
  

      </div>
     </div>
      
      </div>
  )
}

export default CustomerProfileView;