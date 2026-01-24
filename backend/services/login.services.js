// import db config
const conn = require("../config/db.config.js");
//import bcrypt for password hashing
const bcrypt = require("bcrypt");
//import employeeservice for employee related operations
const employeeService = require("../services/employee.services.js");
// Service method for user login
async function loginUser(employeeData) {
  //check if employee exists
  try {
    let returnData = {};
    //get employee data by email
    const employee = await employeeService.getEmployeeByEmail(employeeData);
    if (!employee) {
      returnData = {
        status: "failed",
        message: "Employee does not exist",
      };
      return returnData;
    }
    //compare passwords
    const passwordMatch = await bcrypt.compare(
      employeeData.password,
      employee.employee_password_hashed
    );
    if (!passwordMatch) {
      returnData = {
        status: "failed",
        message: "Incorrect password",
      };
      return returnData;
    }
    else
    {
//if passwords match, return employee data
    returnData = {
      status: "success",
      message: "Login successful",
      data: employee,
    };
    // console.log(returnData);
    return returnData;
    }
    
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  loginUser,
};
