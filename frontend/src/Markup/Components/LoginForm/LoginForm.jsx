import React, {useState} from 'react'
import classes from './LoginForm.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import LoginService from '../../../Services/LoginServices';
import Login from '../../Pages/Login';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  //error state can be added here for form validation feedback
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const handleSubmit = (e) => {
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
    const loginEmployee = LoginService.login(formData);
    loginEmployee.then((response) => {
        console.log(response.data);
        navigate('/dashboard');
    }).catch((error) => {
        console.log(error);
        setServerError('Login failed. Please check your credentials and try again.');
    });
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