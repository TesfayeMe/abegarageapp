//import the express module
const express = require('express');
//import service functions
const employeeService = require('../services/employee.services');
const addEmployee = async (req, res, next) => {
    console.log(req.headers);
    const employee = await employeeService.checkIfEmployeeExists(req.body.employee_email);
    if (employee) {
      return res.status(400).json({ error: 'Employee with this email already exists' });
    }
 else{
     try {
    const employeeData = req.body;
   
    const newEmployee = await employeeService.createEmployee(employeeData);
    if(!newEmployee){
        return res.status(400).json({ error: 'Failed to add employee' });
    }
    else{

        res.status(201).json({success: 'true'});
    }
  }
    catch (error) {
        console.log(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
 }

};
 const getAllEmployees = async (req, res, next) => {
    const employees = await employeeService.getAllEmployeesList();
    if(!employees)
    {
res.status(400).json({
    error: 'Failed to get all employees!'
});
    }
    else
    {
        res.status(200).json({
            status: 'success',
            data: employees
        })
    }
 }
module.exports = {addEmployee, getAllEmployees};