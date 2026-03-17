//import dotenv package
require('dotenv').config();
//import the jsonwebtoken package
const jwt = require('jsonwebtoken');
const employeeServices = require('../services/employee.services')
//A function to verify the token received from the frontend
// const verifyToken = async (req, res, next) => {
//     let token = req.headers['x-access-token'];
//     if (!token) {
//         console.log('No token provided');
//         return res.status(403).send({
//             status: 'noTokenProvided',
//             message: "No token provided!"
//         });
//     }
//     else {
//         console.log(token);
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 if(err.name === 'TokenExpiredError')
//                 {

//                     console.log('Token', err);
//                 }
//                 console.log('Unauthorized!', err);

//                 return res.status(401).send({
//                     status: "tokenExpired",
//                     message: 'tokenExpired!'
//                 })
//             }
//             else {
//                 req.employee_email = decoded.employee_email;
//                 next();
//             }
//         })
//     }
// }


const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    // 1. If it starts with 'Bearer ', remove it correctly
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    } else {
        // 2. Just trim any accidental spaces/newlines
        token = token.trim();
    }

    // 3. LOG IT HERE to see if the 'e' is still missing
    // console.log("Clean Token:", token); 

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ status: "invalidToken", message: err.message });
        }
        req.employee_email = decoded.employee_email;
        next();
    });
};


//function that checks if the user is an admin
const isAdmin = async (req, res, next) => {
    let token = req?.headers['x-access-token'];
    const employee_email = req.employee_email;
    // console.log(employee_email);
    const employee = await employeeServices.getEmployeeRoleByEmail(employee_email);
    //    console.log('role', employee.company_role_id);
    if (employee?.company_role_id === 3) {
        next();
    }
    else {
        console.log('Not an admin');
        return res.status(403).send({
            status: 'notAdmin',
            message: 'Not an admin'
        });
    }
}

//function that checks if the user is an Manager
const isManager = async (req, res, next) => {
    let token = req?.headers['x-access-token'];
    const employee_email = req.employee_email;
    // console.log(employee_email);
    const employee = await employeeServices.getEmployeeRoleByEmail(employee_email);
    //    console.log('role', employee.company_role_id);
    if (employee?.company_role_id === 2) {
        next();
    }
    else {
        console.log('Not an manager');
        return res.status(403).send({
            status: 'notManager',
            message: 'Not an manager'
        });
    }
}

//function that checks if the user is an Employee
const isEmployee = async (req, res, next) => {
    let token = req?.headers['x-access-token'];
    const employee_email = req.employee_email;
    // console.log(employee_email);
    const employee = await employeeServices.getEmployeeRoleByEmail(employee_email);
    //    console.log('role', employee.company_role_id);
    if (employee?.company_role_id === 1) {
        next();
    }
    else {
        console.log('Not an employee');
        return res.status(403).send({
            status: 'notEmployee',
            message: 'Not an employee'
        });
    }
}

//function that checks if the user is an Employee
const isManagerAndAdmin = async (req, res, next) => {
    let token = req?.headers['x-access-token'];
    const employee_email = req.employee_email;
    // console.log(employee_email);
    const employee = await employeeServices.getEmployeeRoleByEmail(employee_email);
    //    console.log('role', employee.company_role_id);
    if (employee?.company_role_id === 2 || employee?.company_role_id === 3) {
        next();
    }
    else {
        console.log('Not a manager or admin');
        return res.status(403).send({
            status: 'notManagerAndNotAdmin',
            message: 'Not a manager or admin'
        });
    }
}

















const isNotEmployee = async (req, res, next) => {
    let token = req?.headers['x-access-token'];
    const employee_email = req.employee_email;
    // console.log(employee_email);
    const employee = await employeeServices.getEmployeeRoleByEmail(employee_email);
    //    console.log('role', employee.company_role_id);
    if (employee?.company_role_id != 1) {
        next();
    }
    else {
        console.log('Is an employee');
        return res.status(403).send({
            status: 'isEmployee',
            message: 'Is an employee'
        });
    }
}

const isNotManager = async (req, res, next) => {
    let token = req?.headers['x-access-token'];
    const employee_email = req.employee_email;
    // console.log(employee_email);
    const employee = await employeeServices.getEmployeeRoleByEmail(employee_email);
    //    console.log('role', employee.company_role_id);
    if (employee?.company_role_id != 2) {
        next();
    }
    else {
        console.log('Is manager');
        return res.status(403).send({
            status: 'isManager',
            message: 'Is a manager'
        });
    }
}

const isNotManagerAndNotEmployee = async (req, res, next) => {
    let token = req?.headers['x-access-token'];
    const employee_email = req.employee_email;
    // console.log(employee_email);
    const employee = await employeeServices.getEmployeeRoleByEmail(employee_email);
    //    console.log('role', employee.company_role_id);
    if (employee?.company_role_id != 2 && employee?.company_role_id != 1) {
        next();
    }
    else {
        console.log('Is manager or employee');
        return res.status(403).send({
            status: 'isManagerOrEmployee',
            message: 'Is a manager or employee'
        });
    }
}

const authMiddleWare = {
    verifyToken,
    isAdmin,
    isManager,
    isEmployee,
    isManagerAndAdmin,



    
    isNotEmployee,
    isNotManager,
    isNotManagerAndNotEmployee
}

module.exports = authMiddleWare;