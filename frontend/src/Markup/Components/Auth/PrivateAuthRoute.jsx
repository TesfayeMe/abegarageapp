import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from 'react-router';
import getAuth from '../../../util/auth'
const PrivateAuthRoute = ({roles, children}) => {
    const location = useLocation();
    const [isChecked, setIsChecked] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    console.log(location);
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() =>{
        const loggedInEmployee = getAuth();
        loggedInEmployee.then((response) =>{
            if(response.employee_token)
            {
                setIsLogged(true)
                if(roles && roles.length > 0 && roles.includes(response.employee_role))
                {
                    setIsAuthorized(true);
                    console.log(roles);
                    console.log(roles.includes(response.employee_role));
                }
            }
            setIsChecked(true);
        })
    }, [roles])

    if(isChecked)
    {
        if(!isLogged)
        {
           return <Navigate to="/login" state={{ from: location }} replace />;
        }
        if(!isAuthorized)
        {
            return <Navigate to ='/unauthorized'/>
        }
    }
    return children;
}

export default PrivateAuthRoute