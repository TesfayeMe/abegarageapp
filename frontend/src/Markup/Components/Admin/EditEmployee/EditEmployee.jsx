import { useAuth } from "../../../../Context/AuthContext";
import LoginForm from "../../../Components/LoginForm/LoginForm";
import AdminMenu from "../../../Components/Admin/AdminMenu/AdminMenu";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
const api_url = import.meta.VITE_APP_API_URL;
const EditEmployee = () => {
    const [employeeInfo, setEmployeeInfo] = useState([]);
    const location = useLocation();

    // Use optional chaining or a fallback to avoid errors if state is undefined
    const employeeId = location.state?.employee_id;
    useEffect(() => {

        // trycatch to get employee details by id from backend
        const fetchEmployeeDetails = async () => {
            try {
                //fetch employee details by id from backend
                const response = await fetch(`${api_url}/api/employee/${employeeId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setEmployeeInfo(data);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };
        fetchEmployeeDetails();
    }, [employeeId])
    //console log employee info
    console.log(employeeInfo);
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
                                            <h2 className="">Edit : Tesfaye Melaku</h2>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="form-column col-md-7">
                                                <div className="inner-column">
                                                    <div className="contact form">
                                                        <form>
                                                            <h2>Employee Email: {employeeId}</h2>
                                                            {/* Add form fields for editing employee details here */}

                                                            <div className="form-group col-md-12">
                                                                <input className="w-100 border" type="text" name="firstName" value={'Tesfaye'} />
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <input className="w-100 border" type="text" name="lastName" value={'Melaku'} />
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <input className="w-100 border" type="text" name="phone" value={'2324224124'} />
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <select className="w-100 border" name="role" value={'Employee'}>
                                                                    <option value="1">Admin</option>
                                                                    <option value="2">Manager</option>
                                                                    <option value="3">Employee</option>
                                                                </select>
                                                            </div>
                                                            <div className=" col-md-12">
                                                                <input type="checkbox" name="activeEmployee" checked />
                                                                <label> Is active employee</label>
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