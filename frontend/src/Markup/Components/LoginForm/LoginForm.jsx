import React, {useState} from 'react'
import classes from './LoginForm.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import LoginService from '../../../Services/LoginServices';
import Login from '../../Pages/Login';
import {useAuth} from '../../../Context/AuthContext'
import getAuth from '../../../util/auth';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
const {isLoggedIn, setIsLoggedIn, setEmployee, employee} = useAuth();
  //error state can be added here for form validation feedback
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    // Handle login logic here
    //validate inputs and set error states if needed
    if (email.trim() === '') {
      setEmailError('Email is required');
      valid = false;
    } 
else if(!email.includes('@')){
      setEmailError('Email must contain @ symbol');
      valid = false;
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email address is invalid');
      valid = false;
    }
    
    else {
      setEmailError('');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (!valid) {
      // Proceed with login
      return
    }
    else {
      const formData = {
        email,
        password
    };
    
     try {
      const loginEmployee = await LoginService.login(formData);
      const data = await loginEmployee.json();
      if(data.status === 'success'){
        if(data.employee_token){
          //decode token to get user data
          localStorage.setItem('employee',JSON.stringify({employee_token: data.employee_token}));
                  setIsLoggedIn(true);
                 const authData = await getAuth(); 
    setEmployee({
        employee_role: authData.employee_role,
        employee_id: authData.employee_id,
        employee_name: authData.employee_name
    });
        /**
         * The target path to redirect to (typically after login).
         * Uses optional chaining to read location.state?.from and falls back to the root path ('/') if that value is undefined or falsy.
         *
         * @type {string}
         */
       // Check if 'from' exists, then check if it's an object with a pathname, 
// otherwise assume 'from' is the string itself.
const redirectPath = location.state?.from?.pathname || location.state?.from || '/';

console.log("Redirecting to:", redirectPath); // Debugging line
navigate(redirectPath, { replace: true });
        }
        else
        {
          console.log('No token received');
          localStorage.removeItem('employee');
          //clear local storage errors
          localStorage.removeItem('logLevel');
          setServerError('Login failed. No token received.');
          return;
        }

      }

      // console.log(data);
     } catch (error) {
      console.log(error);
     }
  }
  }
  return (
    <div className={classes.loginForm}>
      <h2>Login to your account</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.inputGroup}>
                <input type="email" id="email" name="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <span className={classes.error}>{emailError}</span>}
            </div>
            <div className={classes.inputGroup}>
                <input type="password" id="password" name="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <span className={classes.error}>{passwordError}</span>}
            </div>
            <button type="submit" className={classes.loginButton}>LOGIN</button>
        </form>
    </div>
  )
}

export default LoginForm