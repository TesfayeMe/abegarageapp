// import the express module
const express = require('express');
//import controller functions
const employeeController = require('../controllers/employee.controller');
const authMiddleWare = require('../middlewares/auth.middleware')
//import router
const router = express.Router();
//route to add a new employee
router.post('/api/add-employee', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], employeeController.addEmployee);
//route to get all employees
router.get('/api/employees', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], employeeController.getAllEmployees);
//get employee by id
router.get('/api/employee/:employeeId', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], employeeController.getEmployeeById);

//edit employee 
router.put('/api/edit-employee', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], employeeController.updateEmployee);
//delete employee 
router.delete('/api/delete-employee/:employeeId', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], employeeController.deleteEmployee);
//export the router
module.exports = router;