import { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import { useAuth } from "../../../../Context/AuthContext";
import OrderService from "../../../../Services/OrderServices";
import { format } from 'date-fns';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { href, useNavigate } from 'react-router-dom';
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import './ordersList.css'
const OrdersList = () => {

    const { employee } = useAuth();
    let token = null;
    if (employee) {
        token = employee.employee_token;
    }
    // console.log(token);
    const navigate = useNavigate();
    const [savedOrders, setSavedOrders] = useState([]);
    useEffect(() => {
        async function grapeOrders() {
            // alert(employee?.employee_id)
            const getOrders = await OrderService.getAllOrders(token);
            const data = await getOrders.json();
            // console.log(data)
            if (data.status === true) {
                console.log(data.data)
                 setSavedOrders(data.data);
                
                


            }
            else if (data.status === 'tokenExpired') {
                localStorage.removeItem('employee');
                window.location.href = '/login';
    

            }
            else {
                console.log(data.message)
              


            }
        }
        grapeOrders();
    }, [employee?.employee_id])
    console.log(savedOrders);

const  handleViewOrder = async(order_id)=>{
// alert(order_id);
 navigate('/order-details', { state: { order_id: order_id } });
}
    return (
        <div className="orders-list-page">
            <h2>Orders</h2>
            {
                savedOrders.length > 0 ? (<Table striped bordered hover>

                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Customer</th>
                            <th>Vehicle</th>
                            <th>Order Date</th>
                            <th>Received by</th>
                            <th>Order status</th>
                            <th>View/edit</th>
                        </tr>
                    </thead>
                    <tbody>

                        {


                            savedOrders?.map((order) => (
                                <tr key={order.order_id} >
                                    <td>{order.order_id}</td>
                                    <td>
                                        <span><strong> {order.customer_first_name} {order.customer_last_name}</strong></span><br />
                                        <span> {order.customer_email}</span><br />
                                        <span> {order.customer_phone_number}</span>
                                    </td>
                                    <td>
                                        <span><strong>{order.vehicle_make} {order.vehicle_model}</strong></span><br />
                                        <span>{order.vehicle_year}</span><br />
                                        <span>{order.vehicle_tag}</span>
                                    </td>
                                    <td>{format(new Date(order.order_date), 'MM-dd-yyyy | kk:mm')}</td>
                                    <td>
                                        {order.company_role_name} {order.employee_first_name}
                                    </td>
                                    <td>
                                        <span className={`status status-${ order.order_status === 1 ? "received" : order.order_status === 2 ? "assigned" : order.order_status === 3 ? "in-progress" : order.order_status === 4 ? "paused" : order.order_status === 5 ? "canceled" : order.order_status === 6 ? "completed" : "submitted"}`}>
                                            {order.order_status === 1 ? "Received" : order.order_status === 2 ? "Assigned" : order.order_status === 3 ? "In-progress" : order.order_status === 4 ? "Paused" : order.order_status === 5 ? "Canceled" : order.order_status === 6 ? "Completed" : "Submitted" }
                                        </span>
                                    
                                    </td>
                                    <td>
                                        <div className="edit-delete-icons" style={{ display: 'flex', gap: '20px' }}>
                                            <button className="edit-icon" ><LiaEditSolid size={17} /></button>
                                            <button className="delete-icon" onClick ={()=>handleViewOrder(order.order_id)}><BsBoxArrowUpRight size={15} /></button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>) : (<div className="order-not-found-div">Orders not found</div>)
            }

        </div>
    )
}

export default OrdersList
