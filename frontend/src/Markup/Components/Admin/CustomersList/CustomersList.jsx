import { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import { useAuth } from "../../../../Context/AuthContext";
import CustomerService from "../../../../Services/CustomerServices";
import { format } from 'date-fns';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { href, useNavigate } from 'react-router-dom';
import CustomerServices from "../../../../Services/CustomerServices";

const CustomersList = () => {


    const [customers, setCustomers] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null)
    const [editCustomer, setEditCustomer] = useState(false);
    const [customerDeleted, setCustomerDeleted] = useState(false);
    const [deleteCustomer, setDeleteCustomer] = useState(false);
    const [custid, setCustid] = useState(null);
    const [customerDeletedMessage, setCustomerDeletedMessage] = useState(false);
    const navigate = useNavigate();

    const { employee } = useAuth();
    let token = null;
    if (employee) {
        token = employee.employee_token;
    }
    useEffect(() => {
        const allCustomers = CustomerServices.getAllCustomers(token);
        allCustomers.then((res) => {

            if (!res.ok) {
                setApiError(true);
                if (res.status === 401) {
                    setApiErrorMessage('Please login again');
                }
                else if (res.status === 403) {
                    setApiErrorMessage("You are not authorized to view this page");
                }
                else {
                    setApiErrorMessage("Please try again");

                }
            }
            return res.json();

        }).then((custData) => {

            if (custData.status === 'tokenExpired') {

                localStorage.removeItem('employee');
                navigate('/login')
            }
            setCustomers(custData.data);


        })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    console.log(customers)
    const handleEdit = (id) => {

        alert(id)
    }
    const handleDelete = (id) => {
        alert(id)
    }
    return (
        <div>

            <h2>Abe Garage Ustomers </h2>
            <br />
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Added Date</th>
                        <th>Active</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers?.map((customer) => (
                            <tr key={customer.customer_id}>
                                <td>{customer.customer_id}</td>
                                <td>{customer.customer_first_name}</td>
                                <td>{customer.customer_last_name}</td>
                                <td>{customer.customer_email}</td>
                                <td>{customer.customer_phone_number}</td>
                                <td>{format(new Date(customer.customer_added_date), 'MM-dd-yyyy | kk:mm')}</td>
                                <td>{customer.active_customer_status === 1 ? 'Yes' : 'No'}</td>
                                <td>
                                    <div className="edit-delete-icons" style={{ display: 'flex', gap: '20px' }}>
                                        <button className="edit-icon" onClick={() => handleEdit(customer.customer_id)}><CiEdit size={17} /></button>
                                        <button className="delete-icon" onClick={() => handleDelete(customer.customer_id)}><RiDeleteBinLine size={15} /></button>

                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
            {/* {deleteEmployee && <div className="confirm-delete-modal">
                <h4>Are you sure you want to delete this employee?</h4>
                <div className="confirm-delete-buttons">
                    <Button variant="danger" style={{ marginRight: '10px' }} onClick={() => { setDeleteEmployee(false); setEmployeeDeleted(true); }}>Yes</Button>
                    <Button variant="secondary" onClick={() => { setDeleteEmployee(false); setEmployeeDeleted(false); }}>No</Button>
                </div>
            </div>}

            <div className="api-error-message">
                {apiErrorMessage && <p className="error-message">{apiErrorMessage}</p>}
            </div>
            {employeeDeletedMessage &&
                <div className="api-success-message">
                    <span className="success-message">Employee deleted successfully</span>

                </div>
            } */}

        </div>

    )
}

export default CustomersList