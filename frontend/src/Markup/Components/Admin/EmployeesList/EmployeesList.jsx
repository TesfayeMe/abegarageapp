import { useEffect, useState } from "react";
import {Table, Button} from 'react-bootstrap';
import { useAuth } from "../../../../Context/AuthContext";
import EmployeeServices from "../../../../Services/EmployeeServices";
import {format} from 'date-fns';
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

  return (
    <div>EmployeesList {employees.length}</div>
  )
}

export default EmployeesList