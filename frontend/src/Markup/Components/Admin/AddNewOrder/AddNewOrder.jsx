
import './addNewOrder.css';
import { useState, useEffect } from 'react';
import CustomerServices from '../../../../Services/CustomerServices'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../../Context/AuthContext';
import { Table } from 'react-bootstrap';
import { FaHandPointUp } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
const AddNewOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let loginEmployeeToken = '';
    const { employee } = useAuth();
    if (employee && employee?.employee_token) {
        loginEmployeeToken = employee.employee_token;
    }
    // console.log(loginEmployeeToken);
    const [searchValue, setSearchValue] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isCustomerSelected, setIsCustomerSelected] = useState(false);
    const [isVehicleSelected, setIsVehicleSelected] = useState(false);

    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    useEffect(() => {
        async function searchCustomer(searchValue) {
            console.log('serached', searchValue)
            if (!searchValue) {
                setSearchResults([]);
                return;
            }

            const searchCustomerData = await CustomerServices.searchCustomers(searchValue, loginEmployeeToken);
            const customerData = await searchCustomerData.json();
            if (customerData.status === true) {
                console.log(customerData.data)
                setSearchResults(customerData.data);
            }
            else if (customerData.status === 'tokenExpired') {
                localStorage.removeItem('employee');
                window.location.href = '/login'
            }
            else {
                console.log(customerData.message)
            }
        }
        searchCustomer(searchValue);
    }, [searchValue])
    const handleRowClick = async (customer_id) => {
        // alert(customer_id)
        const selectedCustomerData = await CustomerServices.getCustomerById(customer_id, loginEmployeeToken);
        // const selectedCustomerDataJson = await selectedCustomerData.json();
        console.log(selectedCustomerData)
        if (selectedCustomerData.status === true) {
            setSelectedCustomer(selectedCustomerData.data);
            setIsCustomerSelected(true);
            setShowSearchResults(false);
        }
        else if (selectedCustomerData.status === 'tokenExpired') {
            localStorage.removeItem('employee');
            window.location.href = '/login'
        }
        else {
            console.log(selectedCustomerData.message)
        }
    }
    const handleEdit = (customer_id) => {
        navigate(`/admin/edit-customer/${customer_id}`)
    }
    const closeSelectedCustomer = () => {
        setSelectedCustomer(null);
        setIsCustomerSelected(false);
        setSearchValue('');
        setSearchResults([]);
    }
    return (
        <div className='add-new-order-page'>
            <h1>Add a new order</h1>
            {
                isCustomerSelected && selectedCustomer ? (
                    <div className='selected-customer-info'>
                        <div className='customer-info'>
                            <h2>{selectedCustomer.customer_first_name} {selectedCustomer.customer_last_name}</h2>
                            <span><strong>Email : </strong>{selectedCustomer.customer_email}</span><br />
                            <span><strong>Phone : </strong>{selectedCustomer.customer_phone_number}</span><br />
                            <span><strong>Active customer: </strong>{selectedCustomer.active_customer_status === 1 ? 'Yes' : 'No'}</span><br/>
                            <span><strong>Edit customer info: </strong><FaEdit className='edit-customer-icon' size={22} color='red' onClick={() => handleEdit(selectedCustomer.customer_id)} /></span>
                        </div>
                        <div className='close-btn-div'>
                            <button className='select-vehicle-btn' onClick={closeSelectedCustomer}><IoCloseSharp /></button>
                            </div>
                    </div>
                ) : (<di>


                    <div className="add-new-order-content">
                        <form>
                            <div className="customer-search-bar">
                                <input type="text" onChange={(e) => setSearchValue(e.target.value)} className='search-input' placeholder="Search for a customer using firstname, lastname, email address or phone number" />
                                <button type='submit' className='search-btn'>S</button>
                            </div>
                        </form>
                        {searchResults.length > 0 && (
                            <Table striped bordered hover style={{ width: '97%', marginTop: '20px' }}>
                                <tbody>
                                    {searchResults.map((customer) => (
                                        <tr style={{ cursor: 'pointer' }} key={customer.customer_id} onClick={() => handleRowClick(customer.customer_id)}>
                                            <td>{customer.customer_first_name} {customer.customer_last_name}</td>
                                            <td>{customer.customer_email}</td>
                                            <td>{customer.customer_phone_number}</td>
                                            <td><FaHandPointUp /></td>
                                        </tr>
                                    ))}
                                </tbody>


                            </Table>
                        )}


                    </div>
                    {searchResults.length === 0 && (
                        <button type='button' className='theme-btn btn-style-one add-new-customer-btn'>Add new customer</button>
                    )}
                </di>)
            }


        </div>
    )
}

export default AddNewOrder