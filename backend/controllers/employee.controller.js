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
    else {
        try {
            const employeeData = req.body;

            const newEmployee = await employeeService.createEmployee(employeeData);
            if (!newEmployee) {
                return res.status(400).json({ error: 'Failed to add employee' });
            }
            else {

                res.status(201).json({ success: 'true' });
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
    if (!employees) {
        res.status(400).json({
            error: 'Failed to get all employees!'
        });
    }
    else {
        res.status(200).json({
            status: 'success',
            data: employees
        })
    }
}
const updateEmployee = async (req, res, next) => {
    // console.log(req.body.employee_id)
    let employee_id = req.body.employee_id;
    if (employee_id) {
        const editedEmployee = await employeeService.updateEmployee(employee_id);
        if (editedEmployee) {
            console.log('edited', editedEmployee)
            res.send(employee_id)
        }
        else {
            console.log('employee not updated')
        }
    }
    else {
        console.log('error')
        res.send('error')
        return res.status(400).json({
            status: 'fail',
            message: "internal server error"
        })
    }
}
const getEmployeeById = async (req, res, next) => {
    let employee_id = req.params.id;
    const employee = await employeeService.getEmployeeById(employee_id);
    console.log(employee);
}
module.exports = { addEmployee, getAllEmployees, updateEmployee, getEmployeeById };