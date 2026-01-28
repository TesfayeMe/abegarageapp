const api_url = import.meta.env.VITE_APP_API_URL;
import { useAuth } from "../../../../Context/AuthContext";
import LoginForm from "../../../Components/LoginForm/LoginForm";
import AdminMenu from "../../../Components/Admin/AdminMenu/AdminMenu";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import EmployeeServices from "../../../../Services/EmployeeServices";
import { useNavigate } from "react-router-dom";
const EditEmployee = () => {
    const [employeeInfo, setEmployeeInfo] = useState([]);
    const location = useLocation();
    const employeeId = location.state?.employee_id;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch(`${api_url}/api/employee/${employeeId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setEmployeeInfo(data.data[0]);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };
        fetchEmployeeDetails();
    }, [employeeId])
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [phone, setPhone] = useState('');
const [employeeRole, setEmployeeRole] = useState('');
const [activeEmployee, setActiveEmployee] = useState('');
useEffect(()=>{
setFirstName(employeeInfo.employee_first_name);
setLastName(employeeInfo.employee_last_name);
setPhone(employeeInfo.employee_phone);
setEmployeeRole(employeeInfo.company_role_id);
setActiveEmployee(employeeInfo.active_employee);
},[employeeInfo])


let editEmployeeToken = '';
  const {employee} = useAuth();
  if(employee && employee?.employee_token)
  {
    editEmployeeToken = employee.employee_token;
  }

//handle edit form submit
const handleEdit = async (e) => {
    e.preventDefault();
    // alert(`Employee ${firstName} ${lastName} with phone ${phone} is ${employeeRole} and is ${activeEmployee}`)
    if(!firstName.trim() || !lastName.trim() || !phone.trim())
    {
     alert('Please Fill all fields')   
    }
    else if(firstName.trim() === employeeInfo.employee_first_name &&  lastName.trim() === employeeInfo.employee_last_name && phone.trim() === employeeInfo.employee_phone && employeeRole === employeeInfo.company_role_id && activeEmployee === employeeInfo.active_employee)
    {
        alert('Nothing is updated')
    }
    else
    {
        // alert(`${employeeInfo.employee_email} Employee ${firstName} ${lastName} with phone ${phone} is ${employeeRole} and is ${activeEmployee}`)
        const newEmployeeIno = {employee_email: employeeInfo.employee_email ,employee_first_name: firstName, employee_last_name: lastName, employee_phone: phone, employee_role: employeeRole, active_employee: activeEmployee}
        // alert(employeeInfo.employee_email)
        // alert(editEmployeeToken)
        const updatedEmployee = await EmployeeServices.updateEmployee(newEmployeeIno, editEmployeeToken);
        const data = await updatedEmployee.json();
        if(data.status === 'success')
        {
            // alert(' success')
            navigate('/admin/employees');
        }
        else if(data.status === 'tokenExpired')
        {
            localStorage.removeItem('employee')
            navigate('/login')
        }
    }
}

    const { isLoggedIn, isAdmin } = useAuth();
    if (isLoggedIn) {
        if (isAdmin) {
            return (
                <div>
                    <div className="container-fluid admin-pages">
                        <div className="row">
                            <div className="col-md-3 admin-left-side w-100" style={{ backgroundColor: '#091435' }}>
                                <AdminMenu />
                            </div>
                            <div className="col-md-9 admin-right-side">
                                <section className="contact-section">
                                    <div className="auto-container">
                                        <div className="sec-title">
                                            <h2 className="">Edit : {employeeInfo.employee_first_name} {employeeInfo.employee_last_name}</h2>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="form-column col-md-7">
                                                <div className="inner-column">
                                                    <div className="contact form">
                                                        <form onSubmit={handleEdit}>
                                                            <h5>Employee Email: {employeeInfo.employee_email}</h5>

                                                            <div className="form-group col-md-12">
                                                                <input className="w-100 border" type="text" name="firstName" value={firstName} onChange={e=>setFirstName(e.target.value)} />
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <input className="w-100 border" type="text" name="lastName" value={lastName} onChange={e=>setLastName(e.target.value)}  />
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <input className="w-100 border" type="text" name="phone" value={phone} onChange={e=>setPhone(e.target.value)}  />
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <select className="w-100 border" name="role" value={employeeRole} onChange={e=>setEmployeeRole(Number(e.target.value))} >
                                                                    <option value={3}>Admin</option>
                                                                    <option value={2}>Manager</option>
                                                                    <option value={1}>Employee</option>
                                                                </select>
                                                            </div>
                                                            <div className=" col-md-12" style={{display: 'flex'}}>
                                                                <input type="checkbox" value={activeEmployee} name="activeEmployee" checked={activeEmployee === 1} onChange={e=>setActiveEmployee(activeEmployee === 1 ? 2 : 1)} />
                                                              <div style={{display: 'flex'}}><div style={{width: '10px'}}></div>  <div> Is active employee </div></div>
                                                            </div>
                                                            <div className="form-group col-md-12 mt-3">
                                                                <button type="submit" className="theme-btn btn-style-one">
                                                                    Save
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>
                        You are not authorized to access this page
                    </h2>
                </div>
            )
        }
    }
    else {
        return (
            <div>
                <LoginForm />
            </div>
        )
    }
}

export default EditEmployee