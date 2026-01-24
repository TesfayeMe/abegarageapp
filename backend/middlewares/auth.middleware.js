//import dotenv package
require('dotenv').config();
//import the jsonwebtoken package
const jwt  = require('jsonwebtoken');
const employeeServices = require('../services/employee.services')
//A function to verify the token received from the frontend
const verifyToken = async (req, res, next) =>{
  let token = req.headers['x-access-token'];
  if(!token)
  {
    console.log('No token provided');
    return res.status(403).send({
        status: 'fail',
        message: "No token provided!"
    });
  }
  else
  {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err)
        {
    console.log('Unauthorized!', err);

            return res.status(401).send({
                status: "fail",
                message: 'Unauthorized!'
            })
        }
        else
        {
            req.employee_email = decoded.employee_email;
            next();
        }
    })
  }
}

//function that checks if the user is an admin
const isAdmin =  async (req, res, next) => {
    let token = req?.headers['x-access-token'];
    const employee_email = req.employee_email;
    // console.log(employee_email);
   const employee = await employeeServices.getEmployeeRoleByEmail(employee_email);
//    console.log('role', employee.company_role_id);
   if(employee?.company_role_id === 3)
   {
    next();
   }
   else
   {
    console.log('Not an admin');
    return res.status(403).send({
        status: 'fail',
        message: 'Not an admin'
    });
   }
}

const authMiddleWare = {
    verifyToken,
    isAdmin
}

module.exports = authMiddleWare;