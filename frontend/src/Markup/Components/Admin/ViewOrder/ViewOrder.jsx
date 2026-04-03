import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import OrderService from '../../../../Services/OrderServices';
import { useAuth } from '../../../../Context/AuthContext';
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
import { BsSendFill } from "react-icons/bs";
import './ViewOrder.css';
import OrderServices from '../../../../Services/OrderServices';
const ViewOrder = () => {
  const location = useLocation();
  const { employee } = useAuth();
  const navigate = useNavigate();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }
  const [order, setOrder] = useState(null);
  const [modal, setModal] = useState(false);

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
        else {          
          console.error("Unexpected response:", data.message);
        }
      }
    };

    fetchOrder();
  }, [location.state?.order_id, token]);
console.log(order);
//handleChange order status change
const [changeOrderStatus, setChangeOrderStatus] = useState(false);
const [newStatus, setNewOrderStatus] = useState(null)
const handleSaveStatus = async () => {
  const orderId = location.state?.order_id;
  const updateData = {
    orderId: orderId,
    orderStatus: newStatus
  }
  const updateOrderStatus = await OrderService.updateOrderStatus(updateData, token);
       if(updateOrderStatus.status === true)
       {

         alert('Status changed successfully')
         window.location.href='/order-details'
       }
       else
       {
        alert('Status not changed')
       }
  // alert(newStatus);
  setChangeOrderStatus(false)
}


//Save notes handler
const [commentForCustomer, setCommentForCustomer] = useState(null);
const [commentForEmployee, setCommentForEmployee] = useState(null);
const handleSaveNotes = (commentFor) => {
    const employee_id = employee?.employee_id;
    const commentData = {
      comment: commentFor === 1 ? commentForCustomer : commentForEmployee,
      employee_id: employee_id,
      commentFor: commentFor,
      orderId: location.state?.order_id
    }
    const saveNote = OrderServices.saveNote(commentData, token);
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

//controlling overflow during changeOrderStatus pop
useEffect(() => {
  if (changeOrderStatus) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}, [changeOrderStatus]);


//get order additional request and order notes
const [additionalRequest, setAdditionalRequest] = useState(null);
const [comments, setComments] = useState(null)
const [commentsForCustomer, setCommentsForCustomer] = useState([]);
const [commentsForEmployee, setCommentsForEmployee] = useState([]);

useEffect(() => {
  const orderId = location.state?.order_id;
  async function getAdditionalRequests() {
    const additionalRequests = await OrderService.getAdditionalRequests(orderId, token);
   const additionalRequestsData = await additionalRequests.json();
   console.log(additionalRequestsData);
   if(additionalRequestsData.status === true)
   {
    // alert('Yes found');
    setAdditionalRequest(additionalRequestsData.data[0])

   }
   else if(additionalRequestsData.status === false)
   {
    // alert('no additional request found');
    console.log('no additional request found');
   }
   else if(additionalRequestsData.status === 'tokenExpired')
   {
    localStorage.removeItem('employee');
    setAdditionalRequest(null)
    window.location.href='/login'
    // alert('tokenExpired');

   }
   else if(additionalRequestsData.status === 'notManagerAndNotAdmin')
   {
    // alert('Unauthorized please login again');
console.log('Unauthorized please login again')
        window.location.href ='/orders'
   }
    
  }
  async function getOrderNotes() {
    const getOrderNotes = await OrderService.getOrderNotes(orderId, token);
          const getOrderNotesData = await getOrderNotes.json();
if (getOrderNotesData.status === true) {
  const customerComments = [];
  const employeeComments = [];

  getOrderNotesData.data.forEach(comment => {
    if (comment.comment_for === 1) {
      customerComments.push(comment);
    } else {
      employeeComments.push(comment);
    }
  });

  setCommentsForCustomer(customerComments);
  setCommentsForEmployee(employeeComments)
  setComments(getOrderNotesData.data);
}







          else if(getOrderNotesData.status === false)
          {
            console.log('Order comment not found');
          }
         else if(getOrderNotesData.status === 'tokenExpired')
         {
          localStorage.removeItem('employee');
          window.location.href= '/login';
         }
         else if(getOrderNotesData.status === 'notManagerAndAdmin')
         {
          console.log('You are not authorized');
         }
         else
         {
          console.log('Unknown server error');
         }
  }
  getAdditionalRequests();
  getOrderNotes();
}, [location.state?.order_id, token]);
console.log(additionalRequest);


const [additionalRequestValue, setAdditionalRequestValue] =  useState(null)
const handleAddAdditionalRequest = async (order_status) => {
  // const order_id = location.state?.order_id;
if(order_status === 5 || order_status === 6 || order_status === 7)
{  alert('Cannot add additional request for completed, canceled or submitted orders')
  return;
}
else if(additionalRequestValue === null || additionalRequestValue.trim() === '')
{
  alert('Additional request cannot be empty')
  return;
}
else if(additionalRequestValue.split(',').length > 5)
{  alert('You can add up to 5 additional requests at a time, please separate each request with a comma')
  return;
}
else if(additionalRequestValue.length > 500)
{
  alert('Additional request cannot exceed 500 characters')
  return;
}
else if(additionalRequestValue.split(',').some(request => request.trim() === ''))
{
  alert('Additional request cannot contain empty requests, please remove extra commas')
  return;
}
else if(additionalRequestValue.split(',').some(request => request.length > 100))
{
  alert('Each additional request cannot exceed 100 characters')
  return;
}
else if(additionalRequestValue.split(',').some(request => request.length < 3))
{
  alert('Each additional request should be at least 3 characters long')
  return;
}
else if(additionalRequestValue.split(',').some(request => /[^a-zA-Z0-9\s]/.test(request)))
{
  alert('Additional request cannot contain special characters except commas')
  return;
}
else if(additionalRequestValue.split(',').some(request => request.toLowerCase().includes('urgent')))
{
  alert('Additional request cannot contain the word "urgent", please use the priority option to mark an order as urgent')
  return;
}
else if(additionalRequestValue.split(',').some(request => request.toLowerCase().includes('asap')))
{
  alert('Additional request cannot contain the word "asap", please use the priority option to mark an order as urgent')
  return;
}
else if(additionalRequestValue.split(',').some(request => request.toLowerCase().includes('immediately')))
{
  alert('Additional request cannot contain the word "immediately", please use the priority option to mark an order as urgent')
  return;
}
else if(additionalRequestValue.split(',').some(request => request.toLowerCase().includes('emergency')))
{
  alert('Additional request cannot contain the word "emergency", please use the priority option to mark an order as urgent')
  return;
}
else if(additionalRequestValue.split(',').some(request => request.toLowerCase().includes('important')))
{
  alert('Additional request cannot contain the word "important", please use the priority option to mark an order as urgent')
  return;
}
else if(additionalRequestValue.split(',').some(request => request.toLowerCase().includes('high priority')))
{
  alert('Additional request cannot contain the phrase "high priority", please use the priority option to mark an order as urgent')  
  return;
}
else if(additionalRequestValue.split(',').some(request => request.toLowerCase().includes('low priority')))
{  alert('Additional request cannot contain the phrase "low priority", please use the priority option to mark an order as low priority')  
  return;
}
else{

  const additionalRequestData = {
    additionalRequest: additionalRequestValue,
    orderId: location.state?.order_id,
    totalAdditionalRequest: additionalRequestValue?.split(',').length
  }
  console.log(additionalRequestData);
  // alert(`Order id ${order_id}`);
  const addNewRequest = await OrderService.addNewRequest(additionalRequestData, token);
  console.log(addNewRequest);
      if(addNewRequest.status === true)
      {
        window.location.href='/order-details';

      }
      else if(addNewRequest.status === false)
      {
        alert('adding Additional request not success')
      }
      else if(addNewRequest.status === 'tokenExpired')
      {
        localStorage.removeItem('employee');
        setAdditionalRequest(null);
        window.location.href='/login';
      }
      else if(addNewRequest.status === 'notManagerAndAdmin')
      {
        alert('Unauthorized action')
        window.location.href ='/orders'
      }
}


}

const STATUS_MAP = {
  1: "Received",
  2: "Assigned",
  3: "In Progress",
  4: "Paused",
  5: "Canceled",
  6: "Completed",
};


  return (
    <div className="view-order-container">
      <div className='order-detail-and-communication'>

<div className='order-and-actions-on-order'>
<div className='order-and-actions-on-order-right'>
  <div style={{fontWeight:'700', fontSize:'25px', color:'#4d5258'}}>
    Order #{order?.order_id}
  </div>
  <div style={{fontWeight:'500', fontSize:'18px', color:'#989ca1'}}>
{new Date(order?.order_date).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})}
</div>
    <div style={{marginTop: '10px'}}>
      <FaUser  color='#64696e'/>&nbsp; <span><strong>{order?.customer_first_name}</strong></span>
    </div>
    <span>
      <IoIosCar color='#4d5258'/>&nbsp; {order?.vehicle_model} ({order?.vehicle_year})
    </span>
</div>
<div className='order-and-actions-on-order-left'>
  
  <div className='order-status-and-order-price'> 
<div className='order-status'>Status:
<span className={`order-status-txt status-${STATUS_MAP[order?.order_status]}`}>  {STATUS_MAP[order?.order_status] || "Submitted"}</span>

    </div>
    
    <div className='order-price-div' style={{marginTop: '30px'}}><strong >{order?.order_total_price?.toFixed(2)} ETB</strong></div>
  </div>
    <div className='order-action-buttons'>
      <button className='order-action-buttons-btn order-action-buttons-edit'>Edit Order</button>
      <button className='order-action-buttons-btn order-action-buttons-change-status' onClick={()=>setChangeOrderStatus(!changeOrderStatus)}>Change Status</button>
    </div>
</div>
{
  changeOrderStatus && (<div className='modal-overlay'>
  <div className='selection-of-order-status-modal'>
    <div className='selection-of-order-status-modal-body'>

  <h4>Select option below:</h4>
<select onChange={e=>setNewOrderStatus(e.target.value)}>
  <option value='' >Select status</option>
  <option value={1}>Received</option>
  <option value={2}>Assigned</option>
  <option value={3}>In progress</option>
  <option value={4}>Paused</option>
  <option value={5}>Canceled</option>
  <option value={6}>Completed</option>
  <option value={7}>Submitted</option>
</select>
    </div>
  
<div  className='save-status-btn-dv'>
  <button className='save-status-btn' onClick={handleSaveStatus}>Save status</button>
</div>
  </div>

</div>)
}

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
  {commentsForCustomer.map((comment, index)=>(
<span className='view-order-customer-communications-history-body-each-note' key={index}>
 <span className='view-order-customer-communications-history-body-each-note-user-profile'>
  <span className='view-order-customer-communications-history-body-each-note-user-profile-photo'>
    {comment.employee_photo_url === null ? <FaUser color='#b0b5ba' size={30}/>:  comment.employee_photo_url}
  </span>
  <span className='view-order-customer-communications-history-body-each-note-user-first-name'>
    {comment.employee_first_name}

  </span>
 </span>
<div className='view-order-customer-communications-history-body-each-note-content'>
<span className='view-order-customer-communications-history-body-each-note-content-message'>
    {comment.comment}
</span>
<span className='view-order-customer-communications-history-body-each-note-content-date'>
    {new Date(comment.comment_date).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})}
</span>
</div>
</span>
  ))}
</div>
<div className='view-order-customer-communications-history-input-form view-order-notes-input-form'>
<textarea className='view-order-notes-input-form-text-area' placeholder='Note for customer...' onChange={(e)=>setCommentForCustomer(e.target.value)} />
<button className='view-order-notes-input-form-submit-btn' onClick={()=>handleSaveNotes(1)}>    <BsSendFill />       </button>
</div>
  </div>
</div>


<div className='additional-request-and-internal-communication'>
<div className='order-view-additional-request' >
  <span className='order-view-additional-request-header'>
  <VscRequestChanges size={23}/><span className='order-view-additional-request-header-txt'>Additional request</span>
  </span>
  <div className='order-view-additional-request-all-requests'>
{additionalRequest && (additionalRequest?.additional_request.split(',').map((request, index)=>(
    <span className='order-view-additional-request-all-requests-each-request' key={index}>
      {request}
    </span>
)))
}
{ !additionalRequest && 
<div style={{width: '100%', display: 'flex', padding: '2px 10px'}}>
  <p>No additional requests</p>
</div>
}

<div  className='add-new-additional-request-bnt-div'>
  <div className='additional-request-input-form'>
    <textarea className='additional-request-input-form-text-area' placeholder='Additional request...' onChange={(e)=>setAdditionalRequestValue(e.target.value)} ></textarea><button className='add-new-additional-request-bnt' onClick={()=>handleAddAdditionalRequest(order?.order_status)}><BsSendFill color='white' size={35}/></button>
  </div>
</div>
</div>
</div>

<div className='order-view-internal-communication'>
<div className='order-view-internal-communication-header'>
  <TbNotes size={23} color='#3d98d4'/> <span className='order-view-internal-communication-header-txt'>Internal notes</span>
</div>
{commentsForEmployee?.map((comment, index) =>(
<div className='order-view-internal-communication-body' key={index}>
<div className='order-view-internal-communication-body-user'>
<span className='order-view-internal-communication-body-user-photo'>{comment.employee_photo_url === null ? <FaUser color='#adb6be' size={30} /> : comment.employee_photo_url}</span>
<span style={{fontSize: '10px', fontWeight: 'bold'}}>{comment.employee_first_name}</span>
</div>
<div className='order-view-internal-communication-body-text-and-date'>
<span className='order-view-internal-communication-body-text'>{comment.comment}</span>
<span style={{fontSize: '10px', fontWeight: 'bold'}} className='order-view-internal-communication-body-date'>
   {new Date(comment.comment_date).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})}
</span>
</div>
</div>
))}
<div className='order-view-internal-communication-input-form view-order-notes-input-form'>
<textarea className='view-order-notes-input-form-text-area' placeholder='Note for customer...' onChange={(e)=>setCommentForEmployee(e.target.value)} />
<button className='view-order-notes-input-form-submit-btn' onClick={()=>handleSaveNotes(2)}>    <BsSendFill />       </button>
</div>


</div>
</div>
</div>
 </div>

<div className='customer-vehicle-and-receiver-employee'>
 <div className='order-view-customer-information'>
 <span className='order-view-customer-information-header'><FaUserAlt color='#8b898d'  /><span className='customer-information-header-txt'>Customer</span></span>
 <span className='order-view-customer-information-each-info info-name'><FaRegUser color='#8b898d'/> <span>{order?.customer_first_name}</span></span>
 <span className='order-view-customer-information-each-info'><MdEmail color='#8b898d'/> <span>{order?.customer_email}</span></span>
 <span className='order-view-customer-information-each-info'><FaPhoneAlt color='#8b898d'/> <span>{order?.customer_phone_number}</span></span>

</div>

<div className='order-view-vehicle-information'>
 <span className='order-view-vehicle-information-header'><FaCarRear color='#8b898d' /><span className='vehicle-information-header-txt'>Vehicle</span></span>
 <span className='order-view-vehicle-information-each-info'><IoCarSportOutline size={22}/> <span>{order?.vehicle_make} ( {order?.vehicle_model} - {order?.vehicle_year} )</span></span>
 <span className='order-view-vehicle-information-each-info'>Tag: <span>{order?.vehicle_tag}</span></span>
</div>


<div className='order-information-receiver-employee-information'>
 <span className='order-information-receiver-employee-information-header'> <GrUserManager size={25}/>
 <span>Received By</span>
 </span>
 <span className='order-information-receiver-employee-information-body'>
  <GrUserManager color='rgb(74, 162, 250)' size={20}/> <span> {order?.company_role_name} {order?.employee_first_name}</span>
 </span>
</div>
<p className='return-to-orders-list' onClick={()=>navigate('/orders')}>return to order lists</p>
      </div>
    </div>
  )
}

export default ViewOrder
