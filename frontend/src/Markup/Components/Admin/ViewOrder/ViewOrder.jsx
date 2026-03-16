import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import OrderService from '../../../../Services/OrderServices';
import { useAuth } from '../../../../Context/AuthContext';
import { FaEdit } from "react-icons/fa";
import { TbStatusChange } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import './ViewOrder.css';
import OrderServices from '../../../../Services/OrderServices';
const ViewOrder = () => {
  const location = useLocation();
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  const orderId = location.state?.order_id;

  const [order, setOrder] = useState(null);
  const [modal, setModal] = useState(false);
  const [activateInternalNotesInput, setActivateInternalNotesInput] = useState(false);
  const [activateCustomerNotesInput, setActivateCustomerNotesInput] = useState(false);
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
  console.log(order);
console.log(token)
console.log(orderId);

const handleSaveNotes = () => {
    console.log("Saving internal note...", order?.order_id);
    console.log(noteContent);
    
    const saveNote = OrderServices.saveNote(order?.order_id, noteContent, orderColumn, token);
    saveNote.then((response) => response.json())
    .then((data) => {
      if (data.status === true) {
        console.log("Internal note saved successfully:", data.message);
        setOrder((prevOrder) => ({
          ...prevOrder,
          orderColumn: noteContent, 
        }));
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
const handleReplayInternalNotes = () => {
  setOrderColumn("notes_for_internal_use");
  setActivateInternalNotesInput(true);
  setActivateCustomerNotesInput(false);
  setModal(true);
}
const handleReplayCustomerNotes = () => {
  setOrderColumn("notes_for_customer");
  setActivateCustomerNotesInput(true);
  setActivateInternalNotesInput(false);
  setModal(true);
}

  return (
    <div className="view-order-container">
      <h3>{order?.all_services}  {order?.additional_request? `and ${order?.additional_request}` : ''} </h3>
      {order ? (
        <div className="order-details">
          <div className='order-detail-divs order-customer-info'>
            <h4>Customer</h4>
<span><strong>Customer Name:</strong> {order?.customer_first_name} {order?.customer_last_name}</span>
<span><strong>Email:</strong> {order?.customer_email}</span>
          <span><strong>Phone Number:</strong> {order?.customer_phone_number}</span>
          </div>
          <div className='order-detail-divs order-vehicle-info'>
            <h4>Vehicle</h4>

<div className='vehicle-info'>
 <span> <strong>Year:</strong> {order?.vehicle_year}</span> 
 <span> <strong>Make:</strong> {order?.vehicle_make}</span> 
 <span> <strong>Model:</strong> {order?.vehicle_model}</span> 
 <span> <strong>Tag:</strong> {order?.vehicle_tag}</span> 
  </div>
          </div>
          <div className='order-detail-divs order-order-info'>
            <h4>Order</h4>

 <span><strong>Order Date:</strong> {new Date(order?.order_date).toLocaleDateString()}</span>
          <span><strong>Services:</strong> {order?.all_services}</span>
          <span><strong>Total Price:</strong> {order?.order_total_price} ETB </span>
          <span><strong>Additional Requests:</strong> {order?.additional_request}</span>
          <span><strong>Active Orders:</strong> {order?.active_order }</span>
          <span><strong>Active Additional Requests:</strong> {order?.active_additional_request }</span>
         {order?.notes_for_internal_use &&(
<div>
          <span className='order-notes-spn'>
            
               <span>
              <strong>Notes for Internal Use: </strong>
              
             {order?.notes_for_internal_use} 
            </span>
             <span className='notes-replay-spn' >
              <span onClick={handleReplayInternalNotes}>

              Replay
              </span>
              
              </span>
             </span>
             
            </div>
         )}
          

{order?.notes_for_customer && (
<div>
          <span className='order-notes-spn'>
            
               <span>
              <strong>Notes for customer:</strong>
             {order?.notes_for_customer}
            </span>
             <span className='notes-replay-spn' >
              <span onClick={handleReplayCustomerNotes}>

              Replay
              </span>
              </span>
             </span>
             
            </div>
)}
              

          <div className='buttons-for-notes'>
            

            {!order?.notes_for_internal_use && (
 <div>

            <button className='add-notes-about-order' onClick={()=>{setOrderColumn("notes_for_internal_use");setActivateInternalNotesInput(true); setActivateCustomerNotesInput(false); setModal(true)}}>Add internal Notes?</button>
            </div>
            )}
            {!order?.notes_for_customer && (
<div>
 <button className='add-notes-about-order' onClick={()=>{setOrderColumn("notes_for_customer");setActivateCustomerNotesInput(true); setActivateInternalNotesInput(false); setModal(true)}}>Add notes for customer?</button>
            </div>
            )}
           
            
           
          </div>
          <h2><strong> Status: {order.order_status === 0 ? "Received" : order.order_status === 1 ? "Assigned" : order.order_status === 2 ? "In progress" : order.order_status === 3 ? "Paused" : order.order_status === 4 ? "Canceled" : order.order_status === 5 ? "Completed" : "Submitted" }</strong></h2>
          <div className='actions-based-on-information'>

{/* <button className='edit-update-order-order-status-btn'>Edit Order?<FaEdit color='brown' size={23} /></button> */}
<button className='edit-update-order-order-status-btn'>Edit Order?</button>
{/* <button className='edit-update-order-order-status-btn'>Change order status?<TbStatusChange color='green' size={23} /></button> */}
<button className='edit-update-order-order-status-btn'>Change order status?</button>
          </div>

{modal && (
  <div className='order-detail-notes-overlay'>  
        <div className='notes-modal-form-div'>
          <div className='close-notes--form-modal-btn'>
<button onClick={()=>{setModal(false); setNoteContent("");}}><IoMdClose color='red' size={22} /></button>
  </div>
          <form className='notes-modal-form'>
    <div className='notes-modal-form-content-div-header'>
<h4>{activateInternalNotesInput ? "Internal use note" : activateCustomerNotesInput ? "Note for customer" : ""}</h4>
    </div>
    <div className='notes-modal-form-content-div-inputs'>
<textarea className='notes-textarea' value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder='Type your note here...' />
      </div>

<div>
  <button className='notes-form-save-btn' onClick={() => {handleSaveNotes();setNoteContent("")}}>Save note</button>
</div>
            </form>

        </div>
      </div>
)}
          {/* <div className='order-detail-notes-overlay'>
        
        <div className='notes-modal-form-div'>
          <div className='close-notes--form-modal-btn'>
<button><IoMdClose color='red' size={22} /></button>
  </div>
          <form className='notes-modal-form'>

  
    <div className='notes-modal-form-content-div-header'>
<h4>Internal use note || Note for customer</h4>
    </div>
    <div className='notes-modal-form-content-div-inputs'>
<textarea className='notes-textarea' placeholder='Type your note here...' />
      </div>
<div>
  <button className='notes-form-save-btn'>Save note</button>
</div>
  
            </form>

        </div>
      </div> */}




          </div>
          <div className='order-detail-divs order_received_by'>
            <h4>Received By</h4>
          <span> {order?.company_role_name} {order?.employee_first_name} </span>
          </div>
          
    
         
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
      
    </div>
  )
}

export default ViewOrder