//import loginService from '../services/login.service.js';
const loginService = require("../services/login.services.js");
//import jsonwebtoken from 'jsonwebtoken';
const jwt = require("jsonwebtoken");
//get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
// Controller method for user login
async function login(req, res, next) {
  try {
    // console.log(req.body);
    const employeeData = req.body;
    const employee = await loginService.loginUser(employeeData);
    if (employee.status === "failed") {
      return res.status(401).json({ message: employee.message });
    }
    if (employee.status === "success") {
      //signing payload data with JWT secret
      const payload = {
        employee_id: employee.data.employee_id,
        employee_email: employee.data.employee_email,
        employee_role: employee.data.company_role_id,
        employee_first_name: employee.data.employee_first_name,
        employee_last_name: employee.data.employee_last_name,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1hr" });
      return res
        .status(200)
        .json({
          status: employee.status,
          message: employee.message,
          employee_token: token,
        });
    }
  } catch (error) {
    // next(error);
  }
}
module.exports = {
  login,
};
