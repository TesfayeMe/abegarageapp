import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../../../Context/AuthContext';
import CustomerServices from '../../../../Services/CustomerServices';
import "./addcustomerform.css"
const AddCustomerForm = () => {
 const [customer_first_name, setCustomerFirstName] = useState("");
  const [customer_last_name, setCustomerLastName] = useState("");
  const [customer_email, setCustomerEmail] = useState("");
  const [customer_phone, setCustomerPhone] = useState("");

 //error state for each field
  const [first_name_error, setFirstNameError] = useState("");
  const [last_name_error, setLastNameError] = useState("");
  const [email_error, setEmailError] = useState("");
  const [phone_error, setPhoneError] = useState("");

const [server_error, setServerError] = useState("");
  const [success, setSuccess] = useState(false);


 const navigate = useNavigate();
  let loginEmployeeToken = '';
  const {employee} = useAuth();
  if(employee && employee?.employee_token)
  {
    loginEmployeeToken = employee.employee_token;
  }
  console.log(loginEmployeeToken);
const handleCustomerFormSubmit = async (e) => {
  e.preventDefault();
  //alert(`Customer form submitted with first name: ${customer_first_name}, last name: ${customer_last_name}, email: ${customer_email}, phone: ${customer_phone}`);







  let valid = true; //flag to check if form is valid
    //checking each field in there order starting from email
    if (customer_email === "") {
      setEmailError("Customer email is required");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(customer_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }
    //first name validation
    if (customer_first_name.trim() === "") {
      setFirstNameError("Customer first name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    //last name validation
    if (customer_last_name.trim() === "") {
      setLastNameError("Customer last name is required");
      valid = false;
    } else {
      setLastNameError("");
    }
    //phone validation
    if (customer_phone.trim() === "") {
      setPhoneError("Customer phone is required");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!valid) {
      return;
    }
    const formData = {
      customer_first_name,
      customer_last_name,
      customer_email,
      customer_phone,
    };



     try {
      const newCustomer = await CustomerServices.createCustomer(formData, loginEmployeeToken);
      const data = await newCustomer.json();
      console.log("Data:", data.success);
      if(data.success === true)
        {
          // alert("Customer added successfully");
          setSuccess(true);
          setServerError("");
          setTimeout(() => {
            window.location.href = "/";
            }, 2000);
        }
        else if(data.status === 'tokenExpired')
          {
        setServerError(data.error);
        localStorage.removeItem('employee');
        navigate('/login')

      }
      else if(data.success === false)
      {
        setServerError(data.message);
      }
    } catch (error) {
      console.log(error);
    }






}
  return (
    <>
    <div className='add-customer-form-page-container'>
    <h1>Add a new customer</h1>
    <br />
    <form onSubmit={handleCustomerFormSubmit}>
      <div className='form-group'>
        <input type="text" placeholder='Customer email' className='w-100 border' onChange={e=>setCustomerEmail(e.target.value)} />
      </div>
      <div className='form-group'>
        <input type="text" placeholder='Customer first name' className='w-100 border' onChange={e=>setCustomerFirstName(e.target.value)} />
      </div>
      <div className='form-group'>
        <input type="text" placeholder='Customer last name' className='w-100 border' onChange={e=>setCustomerLastName(e.target.value)} />
      </div>
      <div className='form-group'>
        <input type="text" placeholder='Customer phone number' className='w-100 border' onChange={e=>setCustomerPhone(e.target.value)} />
      </div>
      <button type="submit" className='theme-btn btn-style-one'>Add Customer</button>
    </form>

    </div>
    </>
  )
}

export default AddCustomerForm