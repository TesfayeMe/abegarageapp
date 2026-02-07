const api_url = import.meta.env.VITE_APP_API_URL;
import { useAuth } from "../../../../Context/AuthContext";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import CustomerServices from "../../../../Services/CustomerServices";
import { useNavigate } from "react-router-dom";

const EditCustomer = () => {

    const [customerInfo, setCustomerInfo] = useState([]);
    const location = useLocation();
    const customerId = location.state?.customer_id;
    const navigate = useNavigate();
    let token = '';
    const { employee } = useAuth();
    if (employee && employee?.employee_token) {
        token = employee.employee_token;
    }

    const sampleCustomer = [{
        customer_first_name: "Jane",
        customer_last_name: "Smith",
        customer_email: "jane.smith@provider.com",
        customer_phone_number: "555-0123",
        // This would be the result of the encryption/hashing we discussed
        customer_hash: "74616269...3a663932",
        created_at: "2026-02-07T11:40:00Z",
        status: "active"
    }];


    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await fetch(`${api_url}/api/customer/${customerId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                });
                const data = await response.json();
                setCustomerInfo(data.data);
                // setCustomerInfo(sampleCustomer[0]);
                // console.log(data.data);
            } catch (error) {
                console.error('Error fetching customer details:', error);
            }
        };
        fetchCustomerDetails();

    }, [customerId])
    console.log(customerInfo)
    const [custFirstname, setCustFirstname] = useState('');
    const [custLastname, setCustLastname] = useState('');
    const [custPhone, setCustPhone] = useState('');
    const [activeCust, setActiveCust] = useState(null);
    useEffect(() => {
        setCustFirstname(customerInfo?.customer_first_name)
        setCustLastname(customerInfo.customer_last_name)
        setCustPhone(customerInfo.customer_phone_number)
        setActiveCust(customerInfo.active_customer_status)
    }, [customerInfo])
    const handleEdit = async (e) => {
        e.preventDefault();
        let newCustomerInfo = {
            fistname: custFirstname,
            lastname: custLastname,
            phonenumber: custPhone,
            custstatus: activeCust,
            customerid: customerId
        }
        const editCustomer = await CustomerServices.editCustomer(newCustomerInfo, token);
        const data = await editCustomer.json();
        console.log(data)
        if (data.status === true) {
            setTimeout(() => {
                navigate('/admin/customers')
            }, 1500);
        }
        else if (data.message === 'token expired') {
            localStorage.removeItem('employee');
            navigate('/login')
        }
        else {
            console.log(false)
        }
        // alert(`Customer ${custFirstname} ${custLastname} with phone ${custPhone} is active: ${activeCust}`)

    }
    return (
        <div style={{ margin: '30px 0 0 50px' }}>
            <h1><b>Edit: {customerInfo?.customer_first_name}  {customerInfo.customer_last_name}</b></h1>
            <br />
            <h3>Customer email: {customerInfo.customer_email}</h3>
            {/* Customer Info: {JSON.stringify(customerInfo)} */}
            {/* form with input fields to edit customer details */}
            <form onSubmit={handleEdit} className="customer-edit-form" style={{ maxWidth: '600px' }}>
                <div className="form-group">
                    <input type="text" id="firstName" name="firstName" value={custFirstname} onChange={(e) => setCustFirstname(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="text" id="lastName" name="lastName" value={custLastname} onChange={(e) => setCustLastname(e.target.value)} /></div>
                <div className="form-group">
                    <input type="text" id="phone" name="phone" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} />
                </div>
                <div style={{ display: 'flex', marginBottom: '30px' }}>
                    <input type="checkbox" id="active" value={activeCust} name="active" checked={activeCust === 1} onChange={(e) => setActiveCust(activeCust === 0 ? 1 : 0)} />
                    <div style={{ display: 'flex' }}><div style={{ width: '10px' }}></div>  <div> Is active customer </div></div>

                </div>
                <button type="submit" className="theme-btn btn-style-one">Save Changes</button>
            </form>
        </div>
    )
}

export default EditCustomer