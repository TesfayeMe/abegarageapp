import React, {useState, useEffect, useContext} from 'react'
import getAuth from '../util/auth'
const AuthContext = React.createContext();
export const useAuth = () =>{
  return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const value = {isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, employee, setEmployee};
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