import React from 'react'
import classes from './LoginForm.module.css'
const LoginForm = () => {
  return (
    <div className={classes.loginForm}>
      <h2>Login to your account</h2>
        <form>
            <div className={classes.inputGroup}>
                <input type="email" id="email" name="email" placeholder='Email' required />
            </div>
            <div className={classes.inputGroup}>
                <input type="password" id="password" name="password" placeholder='Password' required />
            </div>
            <button type="submit" className={classes.loginButton}>LOGIN</button>
        </form>
    </div>
  )
}

export default LoginForm