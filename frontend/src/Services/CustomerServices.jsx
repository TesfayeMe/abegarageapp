const apiUrl = import.meta.env.VITE_APP_API_URL;
import React from 'react'

const createCustomer = async (customerData, employeeToken) => {
  const response = await fetch(`${apiUrl}/api/add-customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': employeeToken,
    },
    body: JSON.stringify(customerData),
  });
  return response;
}

const getAllCustomers = async (employee_token) => {
  const customers = await fetch(`${apiUrl}/api/customers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': employee_token,
    }
  })
  return customers;
}

const editCustomer = async (customerinfo, employee_token) => {
  const response = await fetch(`${apiUrl}/api/edit-customer`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': employee_token
    },
    body: JSON.stringify(customerinfo)
  }
  )
  console.log(response)
  return response;
}
const CustomerServices = {
  createCustomer,
  getAllCustomers,
  editCustomer
}
export default CustomerServices