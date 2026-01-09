import React from 'react'
import  './AddEmployeeForm.css'
const AddEmployeeForm = () => {
  return (
    <section className= 'contact-section'>
        <div className='auto-container'>
            <div className='sec-title centered'>
                <h2>Add a new employee</h2>
            </div>
            <div className='row clearfix'>
                <div className='form-column col-md-7'>
                    <div className='inner-column'>
                     <div className='contact form'>
<form>
    <div className='row clearfix'>
<div className='form-group col-md-12'>
    <input type="email" className='w-100 border' name='Employee_email'
    placeholder='Employee email' />
</div>
<div className='form-group col-md-12'>
    <input type="text" className='w-100 border' name='Employee_first_name'
    placeholder='Employee First Name' />
</div>
<div className='form-group col-md-12'>
    <input type="text" className='w-100 border' name='Employee_last_name'
    placeholder='Employee Last Name' />
</div>
<div className='form-group col-md-12'>
    <input type="text" className='w-100 border' name='Employee_phone'
    placeholder='Employee Phone' />
</div>
<div className='form-group col-md-12'>
    <select name='Employee_role'>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
        <option value="technician">Technician</option>
        <option value="manager">Manager</option>
    </select>
</div>
<div className='form-group col-md-12'>
    <input type="password" name='Employee_password'
    placeholder='Employee Password' />
</div>
<div className='form-group col-md-12'>
    <button type='submit' className='theme-btn btn-style-one'>Add Employee</button>
</div>



        </div>
</form>
                        </div>
                        </div>
                    </div>
            </div>
        </div>

    </section>
  )
}

export default AddEmployeeForm