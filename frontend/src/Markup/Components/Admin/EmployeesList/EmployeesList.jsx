import { useEffect, useState } from "react";
import {Table, Button} from 'react-bootstrap';
import { useAuth } from "../../../../Context/AuthContext";
import EmployeeServices from "../../../../Services/EmployeeServices";
import {format} from 'date-fns';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
const EmployeesList = () => {

    const [employees, setEmployees] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null)
    const {employee} = useAuth();
    let token = null;
    if(employee)
    {
        token = employee.employee_token;
    }
    // console.log(token);
    useEffect(()=>{
const allEmployees = EmployeeServices.getAllEmployees(token);
allEmployees.then((res) =>{
    
    if(!res.ok)
    {
        console.log(res.status);
        setApiError(true);
    if(res.status === 401)
    {
        setApiErrorMessage('Please login again');
    }
    else if(res.status === 403)
    {
        setApiErrorMessage("You are not authorized to view this page");
    }
    else
        {
        setApiErrorMessage("Please try again");

    }
    }
    return res.json();
    
}).then((emp) =>{
   
console.log(emp);
        setEmployees(emp.data);
   
    
})
.catch((err) =>{
    console.log(err);
})
    }, [])
const handleEdit = ()=>{
    alert('edit')
}
const handleDelete = ()=>{
    alert('delete')
}
  return (
    <div>
        
        <h2>Abe Garage Employees </h2>
        <br/>
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
                    employees.map((employee) =>(
 <tr key={employee.employee_id}>
                <td>{employee.active_employee ? 'Yes':'No'}</td>
                <td>{employee.employee_first_name}</td>
                <td>{employee.employee_last_name}</td>
                <td>{employee.employee_email}</td>
                <td>{employee.employee_phone}</td>
                <td>{format(new Date(employee.added_date), 'MM-dd-yyyy | kk:mm')}</td>
                <td>{employee.company_role_name}</td>
                <td>
                    <div className="edit-delete-icons" style={{display: 'flex', gap: '20px'}}>
                        <button className="edit-icon" onClick={handleEdit}><CiEdit  size={17}/></button>
                        <button className="delete-icon" onClick={handleDelete}><RiDeleteBinLine size={15} /></button>
                        
                    </div>
                </td>
            </tr>
                    ))
                }
           
        </tbody>
    </Table>
    </div>
  )
}

export default EmployeesList