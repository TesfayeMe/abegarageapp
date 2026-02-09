import React from 'react'
import './CustomerProfileView.css'
import { FaEdit } from "react-icons/fa";
const CustomerProfileView = () => {
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

<p><h5><strong>Customer:</strong></h5></p>
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
<button className='themtheme-btn btn-style-one'>Add new vehicle</button>
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