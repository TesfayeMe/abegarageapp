import React, {useState, useEffect, useContext} from 'react'
import getAuth from '../util/auth'
const AuthContext = React.createContext();
export const useAuth = () =>{
  return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isManagerAndAdmin, setIsManagerAndAdmin] = useState(false);
  const [isManagerAndEmployee, setIsManagerAndEmployee] = useState(false);
  const [employee, setEmployee] = useState(null);
  const value = {isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, isManager, setIsManager, isEmployee, setIsEmployee, isManagerAndAdmin, setIsManagerAndAdmin, isManagerAndEmployee, setIsManagerAndEmployee, employee, setEmployee};
  useEffect(()=>{
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response)=>{
      // console.log(response);
      if(response?.employee_token)
      {
        setIsLoggedIn(true);
        if(response.employee_role === 3)
        {
          setIsAdmin(true);
        }
        else if(response.employee_role === 2)
        {
          setIsManager(true);
        }
        else if(response.employee_role === 1)
        {
          setIsEmployee(true);
        }
        if(response.employee_role === 2 || response.employee_role === 3)
        {
          setIsManagerAndAdmin(true);
        }
        if(response.employee_role === 1 || response.employee_role === 2)
        {
          setIsManagerAndEmployee(true);
        }
        
        setEmployee(response)
      }
    })
  },[])
return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
)
}