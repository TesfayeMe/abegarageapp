// import the express module
const express = require('express');
//import controller functions
const employeeController= require('../controllers/employee.controller');
//import router
const router = express.Router();
//route to add a new employee
router.post('/api/employee', employeeController.addEmployee);
//export the router
module.exports = router;