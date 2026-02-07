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
    const {employee} = useAuth();
    if(employee && employee?.employee_token)
    {
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
                setCustomerInfo(data.data[0]);
                setCustomerInfo(sampleCustomer[0]);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching customer details:', error);
            }
        };
        fetchCustomerDetails();
    }, [customerId])

const handleEdit = async (e) => {
    e.preventDefault();
    // alert(`Customer ${firstName} ${lastName} with email ${email} and phone ${phone} is active: ${activeCustomer}`)
    if(!customerInfo.customer_first_name.trim() || !customerInfo.customer_last_name.trim() || !customerInfo.customer_email.trim() || !customerInfo.customer_phone_number.trim())
    {
        alert('Please fill in all fields');
        return;
    }
}
  return (
    <div>
        <h1>Edit: {customerId}</h1>
        <br />
        <h5>Customer email: {customerInfo.customer_email}</h5>
        Customer Info: {JSON.stringify(customerInfo)}
            {/* form with input fields to edit customer details */}
            <form onSubmit={handleEdit} className="customer-edit-form">
                <div className="form-group">
                <input type="text" id="firstName" name="firstName" value={customerInfo.customer_first_name} onChange={(e) => setCustomerInfo({...customerInfo, customer_first_name: e.target.value})} />
                </div>
                <div className="form-group">
                <input type="text" id="lastName" name="lastName" value={customerInfo.customer_last_name} onChange={(e) => setCustomerInfo({...customerInfo, customer_last_name: e.target.value})} /></div>
                <div className="form-group">
                <input type="email" id="email" name="email" value={customerInfo.customer_email} onChange={(e) => setCustomerInfo({...customerInfo, customer_email: e.target.value})} /></div>
                <div className="form-group">
                <input type="text" id="phone" name="phone" value={customerInfo.customer_phone_number} onChange={(e) => setCustomerInfo({...customerInfo, customer_phone_number: e.target.value})} />
               </div>
                <div>
                    <input type="checkbox" id="active" name="active" checked={customerInfo.active_customer === 1} onChange={(e) => setCustomerInfo({...customerInfo, active_customer: e.target.checked ? 1 : 0})} />
                <label htmlFor="active"> is active customer</label>
                
                </div>
                <button type="submit">Save Changes</button>
            </form>
    </div>
  )
}

export default EditCustomer