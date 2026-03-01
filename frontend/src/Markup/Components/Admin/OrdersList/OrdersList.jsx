import { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import { useAuth } from "../../../../Context/AuthContext";
import OrderService from "../../../../Services/OrderServices";
import { format } from 'date-fns';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { href, useNavigate } from 'react-router-dom';
import './ordersList.css'
const OrdersList = () => {

    const { employee } = useAuth();
    let token = null;
    if (employee) {
        token = employee.employee_token;
    }
    // console.log(token);
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
                        {/* cinfo.customer_first_name, cinfo.customer_last_name, cident.customer_email, cident.customer_phone_number, c_v_info.vehicle_make, c_v_info.vehicle_year, c_v_info.vehicle_tag, ord.order_id, ord.order_date, crole.company_role_name, emp_info.employee_first_name, ord_stat.order_status */}

                        {
                            savedOrders?.map((order) => (
                                <tr key={order.order_id} >
                                    <td>{order.order_id}</td>
                                    <td>
                                        <span> {order.customer_first_name}</span><br />
                                        <span> {order.customer_last_name}</span><br />
                                        <span> {order.customer_email}</span><br />
                                        <span> {order.customer_phone_number}</span>
                                    </td>
                                    <td>
                                        <span>{order.vehicle_make}</span><br />
                                        <span>{order.vehicle_year}</span><br />
                                        <span>{order.vehicle_tag}</span>
                                    </td>
                                    <td>{order.order_date}</td>
                                    <td>{employee.employee_phone}</td>
                                    <td>{format(new Date(employee.added_date), 'MM-dd-yyyy | kk:mm')}</td>
                                    <td>
                                        {order.company_role_name} {order.employee_first_name}
                                    </td>
                                    <td>{order.order_status}</td>
                                    <td>
                                        <div className="edit-delete-icons" style={{ display: 'flex', gap: '20px' }}>
                                            <button className="edit-icon" ><CiEdit size={17} /></button>
                                            <button className="delete-icon" ><RiDeleteBinLine size={15} /></button>

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
