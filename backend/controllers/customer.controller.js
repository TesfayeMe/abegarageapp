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
module.exports = {
    addCustomer,
}