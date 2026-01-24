// import the express module
const express = require('express');
//import controller functions
const employeeController= require('../controllers/employee.controller');
const authMiddleWare = require('../middlewares/auth.middleware')
//import router
const router = express.Router();
//route to add a new employee
router.post('/api/employee', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], employeeController.addEmployee);
//route to get all employees
router.get('/api/employees', [authMiddleWare.verifyToken, authMiddleWare.isAdmin], employeeController.getAllEmployees);
//export the router
module.exports = router;