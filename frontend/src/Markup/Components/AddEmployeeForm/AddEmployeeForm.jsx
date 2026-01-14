import React, { useState } from "react";
import "./AddEmployeeForm.css";
import EmployeeServices from "../../../Services/EmployeeServices";
const AddEmployeeForm = () => {
  //state to hold form data fro each one by one
  const [employee_first_name, setEmployeeFirstName] = useState("");
  const [employee_last_name, setEmployeeLastName] = useState("");
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_phone, setEmployeePhone] = useState("");
  const [employee_role, setEmployeeRole] = useState(1);
  const [employee_password, setEmployeePassword] = useState("");
  const [active_employee, setActiveEmployee] = useState(1);

  //error state for each field
  const [first_name_error, setFirstNameError] = useState("");
  const [last_name_error, setLastNameError] = useState("");
  const [email_error, setEmailError] = useState("");
  const [phone_error, setPhoneError] = useState("");
  const [role_error, setRoleError] = useState("");
  const [password_error, setPasswordError] = useState("");

  //server response error state
  const [server_error, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true; //flag to check if form is valid
    //checking each field in there order starting from email
    if (employee_email === "") {
      setEmailError("Employee email is required");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(employee_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }
    //first name validation
    if (employee_first_name.trim() === "") {
      setFirstNameError("Employee first name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    //last name validation
    if (employee_last_name.trim() === "") {
      setLastNameError("Employee last name is required");
      valid = false;
    } else {
      setLastNameError("");
    }
    //phone validation
    if (employee_phone.trim() === "") {
      setPhoneError("Employee phone is required");
      valid = false;
    } else {
      setPhoneError("");
    }
    //role validation
    if (![1, 2, 3].includes(employee_role)) {
      setRoleError("Invalid employee role selected");
      valid = false;
    } else {
      setRoleError("");
    }
    //password validation
    if (employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }
    const formData = {
      employee_first_name,
      employee_last_name,
      employee_email,
      employee_phone,
      employee_role,
      employee_password,
      active_employee,
    };

    try {
      const newEmployee = await EmployeeServices.createEmployee(formData);
      const data = await newEmployee.json();
      console.log("Success:", data);
      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccess(true);
        setServerError("");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="sec-title centered">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-md-7">
            <div className="inner-column">
              <div className="contact form">
                <form onSubmit={handleSubmit} className="add-employee-form">
                  <div className="row clearfix">
                    {/* server error */}
                    {server_error && (
                      <div className="form-group col-md-12">
                        <span className="error server-error">
                          {server_error}
                        </span>
                      </div>
                    )}
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        className="w-100 border"
                        name="Employee_email"
                        placeholder="Employee email"
                        value={employee_email}
                        onChange={(event) =>
                          setEmployeeEmail(event.target.value)
                        }
                      />
                      {email_error && (
                        <span className="error">{email_error}</span>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        className="w-100 border"
                        name="Employee_first_name"
                        placeholder="Employee First Name"
                        value={employee_first_name}
                        onChange={(event) =>
                          setEmployeeFirstName(event.target.value)
                        }
                      />
                      {first_name_error && (
                        <span className="error">{first_name_error}</span>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        className="w-100 border"
                        name="Employee_last_name"
                        placeholder="Employee Last Name"
                        value={employee_last_name}
                        onChange={(event) =>
                          setEmployeeLastName(event.target.value)
                        }
                      />
                      {last_name_error && (
                        <span className="error">{last_name_error}</span>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        className="w-100 border"
                        name="Employee_phone"
                        placeholder="Employee Phone"
                        value={employee_phone}
                        onChange={(event) =>
                          setEmployeePhone(event.target.value)
                        }
                      />
                      {phone_error && (
                        <span className="error">{phone_error}</span>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <select
                        name="Employee_role"
                        value={employee_role}
                        onChange={(event) =>
                          setEmployeeRole(parseInt(event.target.value))
                        }
                      >
                        <option value={1}>Employee</option>
                        <option value={2}>Manager</option>
                        <option value={3}>Admin</option>
                      </select>
                      {role_error && (
                        <span className="error">{role_error}</span>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="Employee_password"
                        placeholder="Employee Password"
                        value={employee_password}
                        onChange={(event) =>
                          setEmployeePassword(event.target.value)
                        }
                      />
                      {password_error && (
                        <span className="error">{password_error}</span>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <button type="submit" className="theme-btn btn-style-one">
                        Add Employee
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEmployeeForm;
