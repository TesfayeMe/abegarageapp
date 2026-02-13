const express = require('express');
const customerService = require('../services/customer.services');
const addCustomer = async (req, res) => {

    const { customer_first_name, customer_last_name, customer_email, customer_phone } = req.body;
    const customerData = {
        customer_first_name,
        customer_last_name,
        customer_email,
        customer_phone
    };
    // console.log('customerData:', customerData);
    const newCustomer = await customerService.createCustomer(customerData);
    if (!newCustomer) {
        console.log("Failed to create customer:", newCustomer);
        return res.status(400).json({ success: false, message: 'Failed to add customer' });
    }
    else {
        // console.log("Customer created successfully:", newCustomer);
        return res.status(201).json({ success: true, message: 'Customer added successfully' });
    }


}

const getAllCustomers = async (req, res, next) => {
    const customers = await customerService.allCustomers();
    if (!customers) {
        return res.status(400).json({
            status: false,
            message: 'No customer found'
        })
    }
    else {
        console.log(customers)
        return res.status(200).json({
            status: true,
            data: customers
        })
    }
}

const getCustomerById = async (req, res, next) => {
    const { customerId } = req.params
    console.log(customerId)
    const customer = await customerService.getCustomerById(customerId);
    if (!customer) {
        res.status(400).json({
            status: false,
            message: 'No such customer'
        })
    }
    else {
        return res.status(200).json({
            status: true,
            data: customer
        })
    }
}

const editCustomer = async (req, res, next) => {
const custinfo = req.body;
    const editcustomer = customerService.editCustomer(custinfo);
    if (!editcustomer)
    {
return res.status(400).json({
    status: false,
    message: 'failed to update'
})
    }
    else
    {
        console.log(editcustomer)
        return res.status(200).json({
            status: true,
            message: 'updated'
        })
    }
}
const deleteCustomer = async (req, res, next) => {
    const { customerId } = req.params;
    console.log(customerId);
    const deletedCustomer = await customerService.deleteCustomer(customerId);
    if (!deletedCustomer) {
        return res.status(400).json({
            status: false,
            message: 'Failed to delete customer'
        })
    }
    else {
        return res.status(200).json({
            status: true,
            message: 'Customer deleted successfully'
        })
    }
}
module.exports = {
    addCustomer,
    getAllCustomers,
    editCustomer,
    getCustomerById,
    deleteCustomer
}