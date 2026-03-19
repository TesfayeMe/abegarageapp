import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import OrderService from '../../../../Services/OrderServices';
import { useAuth } from '../../../../Context/AuthContext';
import { FaEdit } from "react-icons/fa";
import { TbStatusChange } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosCar } from "react-icons/io";
import { FaWrench } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { VscRequestChanges } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import { IoCarSportOutline } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import './ViewOrder.css';
import OrderServices from '../../../../Services/OrderServices';
const ViewOrder = () => {
  const location = useLocation();
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }
  const [order, setOrder] = useState(null);
  const [modal, setModal] = useState(false);
  const [activateInternalNotesInput, setActivateInternalNotesInput] = useState(false);
  const [activateCustomerNotesInput, setActivateCustomerNotesInput] = useState(false);
  const [activateSaveReplay, setActivateSaveReplay] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [orderColumn, setOrderColumn] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (location.state?.order_id) {
        const getOrder = await OrderService.getOrderById(location.state.order_id, token);
        const data = await getOrder.json();
        if (data.status === true) {
          setOrder(data.data);
        }
        else if(data.status === false){
          console.error("Failed to fetch order:", data.message);
        }
        else if(data.status === "tokenExpired"){
          console.error("Token expired. Please log in again.");
        }
        else if(data.status === "notManagerAndAdmin"){
          console.error("You are not a manager or admin.");
        }
        else {          console.error("Unexpected response:", data.message);
        }
      }
    };

    fetchOrder();
  }, [location.state?.order_id, token]);

const handleSaveNotes = () => {
    const employee_id = employee?.employee_id;
    const saveNote = OrderServices.saveNote(order?.order_id, noteContent, orderColumn, employee_id, token);
    saveNote.then((response) => response.json())
    .then((data) => {
      if (data.status === true) {
        console.log("Internal note saved successfully:", data.message);
        setOrder((prevOrder) => ({
          ...prevOrder,
          orderColumn: noteContent, 
        }));
        window.location.reload();
      } else if (data.status === false) {
        console.error("Failed to save internal note:", data.message);
      }
      else if (data.status === "tokenExpired") {
        console.error("Token expired. Please log in again.");
      }
      else if (data.status === "notManagerAndAdmin") {
        console.error("You are not a manager or admin.");
      }
      else {
        console.error("Unexpected response:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error saving internal note:", error);
    });
 
  setModal(false);
  
  
}
const handleSaveReplay = () => {
  const employee_id = employee?.employee_id;
    const saveRelay = OrderServices.saveRelay(order?.comment_id, noteContent, employee_id, token);
    saveRelay.then((response) => response.json())
    .then((data) => {
      if (data.status === true) {
        console.log("Replay saved successfully:", data.message);
        window.location.reload();
      } else if (data.status === false) {
        console.error("Failed to save replay:", data.message);
      }
      else if (data.status === "tokenExpired") {
        console.error("Token expired. Please log in again.");
      }
      else if (data.status === "notManagerAndAdmin") {
        console.error("You are not a manager or admin.");
      }
      else {
        console.error("Unexpected response:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error saving replay:", error);
    });
  setModal(false);
  
}

useEffect(() => {
  if (modal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}, [modal]);

useEffect(() => {
  
}, [location.state?.order_id, token]);

  return (
    <div className="view-order-container">
      <div className='order-detail-and-communication'>

<div className='order-and-actions-on-order'>
<div className='order-and-actions-on-order-right'>
  <div style={{fontWeight:'700', fontSize:'25px', color:'#4d5258'}}>
    Order #{order?.order_id}
  </div>
  <div style={{fontWeight:'500', fontSize:'18px', color:'#989ca1'}}>
  {order?.order_date} 

</div>
    <div style={{marginTop: '10px'}}>
      <FaUser  color='#64696e'/>&nbsp; <span><strong>{order?.customer_first_name}</strong></span>
    </div>
    <span>
      <IoIosCar color='#4d5258'/>&nbsp; {order?.vehicle_model} ({order?.vehicle_year})
    </span>
</div>
<div className='order-and-actions-on-order-left'>
  
  <div className='order-status'>
Status <span className='assigned'>
  {order?.order_status===1 ? "Assigned" : "Not Assigned"}
  </span>
    </div>
    <br/>
    
    <div className='order-price-div'><strong >{order?.order_total_price?.toFixed(2)} ETB</strong></div>
    <div className='order-action-buttons'>
      <button className='order-action-buttons-btn order-action-buttons-edit'>Edit Order</button>
      <button className='order-action-buttons-btn order-action-buttons-change-status'>Change Status</button>
    </div>
</div>

</div>




<div className='communication-on-order-and-services'>
<div className='services-and-customer-communications'>
  <div className='view-order-order-services'>
<span className='view-order-order-services-header'><FaWrench color='#848688' size={22} height={10}/><strong style={{fontSize: '24px', color: '#74777e'}}>  Services</strong></span>

<div className='view-order-order-services-all-services'>
{
  order?.all_services?.split(',').map((service, index)=>(
    <div key={index}>
<div className='view-order-order-services-all-services-each-service'> <FaWrench color='#848688' size={15}/> &nbsp;{service}</div>
    </div>
  ))
}
</div>

  </div>



  <div className='view-order-customer-communications-history'>
<div className='view-order-customer-communications-history-header'><TbNotes color='#4e8ece'size={22} />
  <span className='view-order-customer-communications-history-header-txt'>Customer notes</span>
</div>
<div className='view-order-customer-communications-history-body'>
<span className='view-order-customer-communications-history-body-each-note'>
  Hello customer please bring your car key
</span>
<span className='view-order-customer-communications-history-body-each-note'>
 <span className='view-order-customer-communications-history-body-each-note-user-profile'>
  <span className='view-order-customer-communications-history-body-each-note-user-profile-photo'>
    Photo
  </span>
  <span className='view-order-customer-communications-history-body-each-note-user-first-name'>
  Gebre Egiziabhier
  </span>
 </span>
<div className='view-order-customer-communications-history-body-each-note-content'>
<span className='view-order-customer-communications-history-body-each-note-content-message'>
   Hello customer please take your car, your car is ready to go
  Hello customer please take your car, your car is ready to go
  Hello customer please take your car, your car is ready to go
  Hello customer please take your car, your car is ready to go 
</span>
<span className='view-order-customer-communications-history-body-each-note-content-date'>
  Mar 20, 2026
</span>
</div>
</span>
</div>
  </div>
</div>


<div className='additional-request-and-internal-communication'>
<div className='order-view-additional-request' >
  <span className='order-view-additional-request-header'>
  <VscRequestChanges size={23}/><span className='order-view-additional-request-header-txt'>Additional request</span>
  </span>
   <div className='order-view-additional-request-all-requests'>
    <span className='order-view-additional-request-all-requests-each-request'>
      Hello customer please take your car, your car
    </span>
     <span className='order-view-additional-request-all-requests-each-request'>
      Hello customer please take your car, your car
    </span>
  </div>
</div>

<div className='order-view-internal-communication'>
<div className='order-view-internal-communication-header'>
  <TbNotes size={23} color='#3d98d4'/> <span className='order-view-internal-communication-header-txt'>Internal notes</span>
</div>



<div className='order-view-internal-communication-body'>
<div className='order-view-internal-communication-body-user'>
<span>Photo</span>
<span>Username</span>
</div>
<div className='order-view-internal-communication-body-text-and-date'>
<span className='order-view-internal-communication-body-text'>Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go</span>
<span className='order-view-internal-communication-body-date'>Mar 20, 2026</span>
</div>

</div>



<div className='order-view-internal-communication-body'>
<div className='order-view-internal-communication-body-user'>
<span>Photo</span>
<span>Username</span>
</div>
<div className='order-view-internal-communication-body-text-and-date'>
<span className='order-view-internal-communication-body-text'>Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go</span>
<span className='order-view-internal-communication-body-date'>Mar 20, 2026</span>
</div>

</div>


<div className='order-view-internal-communication-body'>
<div className='order-view-internal-communication-body-user'>
<span>Photo</span>
<span>Username</span>
</div>
<div className='order-view-internal-communication-body-text-and-date'>
<span className='order-view-internal-communication-body-text'>Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go</span>
<span className='order-view-internal-communication-body-date'>Mar 20, 2026</span>
</div>

</div>


<div className='order-view-internal-communication-body'>
<div className='order-view-internal-communication-body-user'>
<span>Photo</span>
<span>Username</span>
</div>
<div className='order-view-internal-communication-body-text-and-date'>
<span className='order-view-internal-communication-body-text'>Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go Hello customer please take your car, your car is ready to go</span>
<span className='order-view-internal-communication-body-date'>Mar 20, 2026</span>
</div>

</div>
</div>
</div>
</div>
 </div>

<div className='customer-vehicle-and-receiver-employee'>
<div className='order-view-customer-information'>
<span className='order-view-customer-information-header'><FaUserAlt color='#8b898d'  /><span className='customer-information-header-txt'>Customer</span></span>
<span className='order-view-customer-information-each-info info-name'><FaRegUser color='#8b898d'/> <span>Tesfaye</span></span>
<span className='order-view-customer-information-each-info'><MdEmail color='#8b898d'/> <span>kostrie@gmail.cm</span></span>
<span className='order-view-customer-information-each-info'><FaPhoneAlt color='#8b898d'/> <span>09374837854</span></span>

</div>
<div className='order-view-vehicle-information'>
<span className='order-view-vehicle-information-header'><FaCarRear color='#8b898d' /><span className='vehicle-information-header-txt'>Vehicle</span></span>
<span className='order-view-vehicle-information-each-info'><IoCarSportOutline/> <span>Toyota(2021)</span></span>
<span className='order-view-vehicle-information-each-info'>Tag: <span>2dsf21erere</span></span>
</div>


<div className='order-information-receiver-employee-information'>
<span className='order-information-receiver-employee-information-header'> <GrUserManager size={25}/>
<span>Received By</span>
</span>
<span className='order-information-receiver-employee-information-body'>
  <GrUserManager color='rgb(74, 162, 250)' size={20}/> <span> admin Tesfaye</span>
</span>
</div>
      </div>
    </div>
  )
}

export default ViewOrder
