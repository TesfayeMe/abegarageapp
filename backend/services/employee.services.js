// import db configuration
const conn = require('../config/db.config');
const bcrypt = require('bcrypt');

//check if employee exists by email
async function checkIfEmployeeExists(email) {
    const query = 'SELECT * FROM employee WHERE employee_email = ?';
    const [rows] = await conn.query(query, [email]);
    // console.log('email existed rows',rows.length);
    return rows.length > 0 ? true : false;
}
// async function to get employee data by email
async function getEmployeeByEmail(employeeData) {
    //query to get all an employee data by email from employee table, employee_info table, employee_role table, employee_pass table, using inner joins

    const query = `SELECT e.employee_id, e.employee_email, ei.employee_first_name, ei.employee_last_name, ei.employee_phone, er.company_role_id, ep.employee_password_hashed
    FROM employee e
    INNER JOIN employee_info ei ON e.employee_id = ei.employee_id
    INNER JOIN employee_role er ON e.employee_id = er.employee_id
    INNER JOIN employee_pass ep ON e.employee_id = ep.employee_id
    WHERE e.employee_email = ?`;
    const [rows] = await conn.query(query, [employeeData.email]);
    // console.log(rows[0]);
    return rows.length > 0 ? rows[0] : null;
}
// async function to get employee data by email
async function getEmployeeRoleByEmail(employeeEmail) {
    //query to get all an employee data by email from employee table, employee_info table, employee_role table, employee_pass table, using inner joins

    const query = `SELECT e.employee_id, e.employee_email, ei.employee_first_name, ei.employee_last_name, ei.employee_phone, er.company_role_id, ep.employee_password_hashed
    FROM employee e
    INNER JOIN employee_info ei ON e.employee_id = ei.employee_id
    INNER JOIN employee_role er ON e.employee_id = er.employee_id
    INNER JOIN employee_pass ep ON e.employee_id = ep.employee_id
    WHERE e.employee_email = ?`;
    const [rows] = await conn.query(query, [employeeEmail]);
    // console.log(rows[0]);
    return rows.length > 0 ? rows[0] : null;
}

//create new employee
async function createEmployee(employeeData) {
    let createdEmployee = {};
    // console.log(employeeData);
    try {
        //generate salt and hash password
        const salt = await bcrypt.genSalt(10);

        //hash the password
        const hashedPassword = await bcrypt.hash(employeeData.employee_password, salt);
        //insert email to the employee table
        const query = 'INSERT INTO employee (employee_email,  active_employee) VALUES (?, ?)';
        const [result] = await conn.query(query, [
            employeeData.employee_email,
            employeeData.active_employee
        ]);
        if (result.affectedRows !== 1) {
            return null;
        }
        else {
            const employee_id = result.insertId;
            //insert queries for tables employee_info(employee_id, first_name, last_name, phone_number), employee_auth(employee_id, password_hash, salt);
            const infoQuery = 'INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)';
            await conn.query(infoQuery, [
                employee_id,
                employeeData.employee_first_name,
                employeeData.employee_last_name,
                employeeData.employee_phone
            ]);

            //insert queries for tables employee_pass(employee_id, employee_password_hashed);
            const passQuery = 'INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)';
            await conn.query(passQuery, [
                employee_id,
                hashedPassword
            ]);
            //insert queries for tables employee_role(employee_id, company_role);
            const roleQuery = 'INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)';
            await conn.query(roleQuery, [
                employee_id,
                employeeData.employee_role
            ]);
            return createdEmployee = { employee_id: employee_id };

        }
    } catch (error) {
        console.log(error);
    }
}
// function to get all employees
const getAllEmployeesList = async () => {
    const query = `SELECT *
    FROM employee e
    INNER JOIN employee_info ei ON e.employee_id = ei.employee_id
    INNER JOIN employee_role er ON e.employee_id = er.employee_id
    INNER JOIN employee_pass ep ON e.employee_id = ep.employee_id
    INNER JOIN company_roles cr ON cr.company_role_id = er.company_role_id
    LIMIT 10`;
    const [rows] = await conn.query(query);
    // console.log(rows);
    return rows.length > 0 ? rows : null;
}

const updateEmployee = async (employeeInfo) => {  

  const {employee_email, employee_first_name, employee_last_name, employee_phone, employee_role, active_employee} = employeeInfo;
  const empInfo = [active_employee,employee_first_name,employee_last_name,employee_phone, employee_role, employee_email];
  const sql = `update employee e
               INNER JOIN  employee_info ef on e.employee_id = ef.employee_id
               INNER JOIN  employee_role er on e.employee_id = er.employee_id
               INNER JOIN company_roles cr on er.company_role_id = cr.company_role_id
               set
               e.active_employee = ?,
               ef.employee_first_name =?,
               ef.employee_last_name = ?,
               ef.employee_phone = ?,
               er.company_role_id = ?
               where e.employee_email = ?
              `;
        const [updated]= await conn.query(sql, empInfo)
    return updated.changedRows;

}
const getEmployeeById = async (employee_id) => {
    const sql = `SELECT e.employee_id, e.active_employee, e.employee_email, ei.employee_first_name, ei.employee_last_name, ei.employee_phone, er.company_role_id
    FROM employee e
    INNER JOIN employee_info ei ON e.employee_id = ei.employee_id
    INNER JOIN employee_role er ON e.employee_id = er.employee_id
    WHERE e.employee_id = ?`
    const [employee] = await conn.query(sql, [employee_id]);
    return employee.length > 0 ? employee : null
   
}

const deleteEmployee = async (employee_id) => {
    const sql = `DELETE FROM employee WHERE employee_id = ?`;
    const [deletedRows] = await conn.query(sql, [employee_id]);
    return deletedRows.affectedRows;
}

module.exports = {
    checkIfEmployeeExists,
    createEmployee,
    getEmployeeByEmail,
    getEmployeeRoleByEmail,
    getAllEmployeesList,
    updateEmployee,
    getEmployeeById,
    deleteEmployee
};