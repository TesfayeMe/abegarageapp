import React from 'react'
import './CustomerProfileView.css'
import { FaEdit } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
const CustomerProfileView = (props) => {
  const location = useLocation();
  const customerId = location.state?.customer_id;
  // alert('customer profile view for customer ID: ' + location.state?.customer_id);
  
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
<div className='message-of-no-vehicle-found'>
      <span>No vehicle found</span>
    </div>
<div>
  <span>Vehicle list of adugna</span>
</div>
<button className='theme-btn btn-style-one'>Add new vehicle</button>
<div className='new-vehicle-form-div'>
  <div className='form-close-btn'>
x
  </div>
  <form className='new-vehicle-form'>
    
    <div className='form-group col-md-12'>

    <input type="text" id="make" name="make"  placeholder='Make'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="model" name="model" placeholder='Model' required />
    </div>
    <div className='form-group col-md-12'>
    <input type="number" id="year" name="year" placeholder='Year'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="type" name="type" placeholder='Type'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="color" name="color" placeholder='Color'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="vin" name="vin" placeholder='VIN Number'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="license_plate" name="license_plate" placeholder='License Plate Number'  required />
    </div>
    <div className='form-group col-md-12'>
    <input type="text" id="engine_number" name="engine_number" placeholder='Engine Number'  required />
    </div>
    <div className='form-group col-md-12'>
    <button type="submit" className='theme-btn btn-style-one'>Add Vehicle</button>
</div>
    </form>

</div>
  </div>
</div>


<div className='customer-profile-view-right-order-details'>
  <div className='customer-profile-view-right-pointer-circle-end'>
<div className='customer-profile-view-right-order-pointer-circle-inner'>
  Orders
</div>
  </div>
  <div className='customer-profile-view-right-order-details-content'>

<p><strong>Order Information:</strong></p>
<p>Order ID: 12345</p>
<p>Date: 2024-06-01</p>
<p>Status: Completed</p>

  </div>
</div>
      </div>
     
      
      </div>
  )
}

export default CustomerProfileView