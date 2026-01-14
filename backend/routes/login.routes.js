//import express from 'express';
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

// Route for user login
router.post('/api/employee/login', loginController.login);
module.exports = router;