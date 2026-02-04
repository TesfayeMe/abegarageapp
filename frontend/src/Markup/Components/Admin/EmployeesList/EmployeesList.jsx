import { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import { useAuth } from "../../../../Context/AuthContext";
import EmployeeServices from "../../../../Services/EmployeeServices";
import { format } from 'date-fns';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { href, useNavigate } from 'react-router-dom';
import EditEmployee from "../EditEmployee/EditEmployee";
import './employeeList.css';
const EmployeesList = () => {

    const [employees, setEmployees] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null)
    const [editEmployee, setEditEmployee] = useState(false);
    const [employeeDeleted, setEmployeeDeleted] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState(false);
    const [empid, setEmpid] = useState(null);
    const navigate = useNavigate();

    const { employee } = useAuth();
    let token = null;
    if (employee) {
        token = employee.employee_token;
    }
    // console.log(token);
    useEffect(() => {
        const allEmployees = EmployeeServices.getAllEmployees(token);
        allEmployees.then((res) => {

            if (!res.ok ) {
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
            
        }).then((emp) => {
            
            if(emp.status === 'tokenExpired')
            {

                localStorage.removeItem('employee');
                navigate('/login')
            }
            setEmployees(emp.data);


        })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const handleEdit = (id) => {
        navigate('/admin/edit-employee', { state: { employee_id: id } });

    }
    const handleDelete = (a) => {
    setDeleteEmployee(true)
    setEmpid(a);
    }
    useEffect(()=>{
    if(employeeDeleted)
    {
        const deleteEmp = EmployeeServices.deleteEmployee(empid, token);
        deleteEmp.then((res) => {
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
            
        }).then((data) => {
            if(data.status === 'tokenExpired')
            {

                localStorage.removeItem('employee');
                navigate('/login')
            }
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })     
        setEmployeeDeleted(false);     
        window.location.href = "/admin/employees";
    }
    }, [employeeDeleted])
    return (
        <div>

            <h2>Abe Garage Employees </h2>
            <br />
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>Active</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date of Registration</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees?.map((employee) => (
                            <tr key={employee.employee_id}>
                                <td>{employee.active_employee === 1 ? 'Yes' : 'No'}</td>
                                <td>{employee.employee_first_name}</td>
                                <td>{employee.employee_last_name}</td>
                                <td>{employee.employee_email}</td>
                                <td>{employee.employee_phone}</td>
                                <td>{format(new Date(employee.added_date), 'MM-dd-yyyy | kk:mm')}</td>
                                <td>{employee.company_role_name}</td>
                                <td>
                                    <div className="edit-delete-icons" style={{ display: 'flex', gap: '20px' }}>
                                        <button className="edit-icon" onClick={() => handleEdit(employee.employee_id)}><CiEdit size={17} /></button>
                                        <button className="delete-icon" onClick={() => handleDelete(employee.employee_id)}><RiDeleteBinLine size={15} /></button>

                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
<div className="confirm-delete-controller">
            {deleteEmployee && <div className="confirm-delete-modal">
                <h4>Are you sure you want to delete this employee?</h4>
                <div className="confirm-delete-buttons">
                    <Button variant="danger" style={{ marginRight: '10px' }} onClick={() => {setDeleteEmployee(false); setEmployeeDeleted(true);}}>Yes</Button>
                <Button variant="secondary" onClick={() => {setDeleteEmployee(false); setEmployeeDeleted(false);}}>No</Button>
                </div>
            </div>}

</div>

        </div>
    )
}

export default EmployeesList