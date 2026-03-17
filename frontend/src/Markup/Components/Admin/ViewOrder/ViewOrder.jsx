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
  <span style={{fontWeight:'700', fontSize:'25px', color:'#4d5258'}}>
    Order #{order?.order_id}
  </span>
  <br />
  <span style={{fontWeight:'500', fontSize:'18px', color:'#989ca1'}}>
  {order?.order_date} <br /><br />
</span>
    <span>
      <FaUser  color='#64696e'/>&nbsp; <span>{order?.customer_first_name}</span>
    </span><br/>
    <span>
      <IoIosCar color='#4d5258'/>&nbsp; {order?.vehicle_model} ({order?.vehicle_year})
    </span>
</div>
<div className='order-and-actions-on-order-left'>
  order status, <br/>
order price, <br/>
edit btn , <br/>
change status btn, <br/>
</div>

</div>
<div className='communication-on-order-and-services'>
<div className='services-and-customer-communications'>
services and customer communications
</div>
<div className='received-by-and-internal-communication'>
received by and internal communication
</div>

</div>
      </div>
      <div className='customer-vehicle-and-receiver-employee'>

<div className='customer-information'>
customer information

</div>
<div className='vehicle-information'>
vehicle information

</div>
<div className='receiver-employee-information'>
receiver employee information
</div>
      </div>
    </div>
  )
}

export default ViewOrder
