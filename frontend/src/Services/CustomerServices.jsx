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

const deleteCustomer = async (customer_id, employee_token) => {
  const response = await fetch(`${apiUrl}/api/delete-customer/${customer_id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': employee_token
    }
  }
  )
  console.log(response)
  return response;
}
const getCustomerById = async (customer_id, employee_token) => {
  console.log('customer_id', customer_id);
  const response = await fetch(`${apiUrl}/api/customer/${customer_id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': employee_token
    }
  }
  )
  const customer = await response.json();
  console.log(customer)
  return customer;
}
const CustomerServices = {
  createCustomer,
  getAllCustomers,
  editCustomer,
  deleteCustomer,
  getCustomerById
}
export default CustomerServices