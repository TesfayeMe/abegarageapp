const express = require('express');
const router = express.Router();
const installRouter = require('./install.routes.js');
//import other routers
const employeeRouter = require('./employee.routes.js');
//use the imported routers
//import loginRouter from './login.routes.js';
const loginRouter = require('./login.routes.js');
//import customerRouter from './customer.routes.js';
const customerRouter = require('./customer.routes.js');
//import vehicleRouter from './vehicle.routes.js';
const vehicleRouter = require('./vehicle.routes.js');
//import serviceRouter from './service.routes.js
const serviceRouter = require('./services.routes.js')
router.use(loginRouter);
router.use(installRouter);
router.use(employeeRouter);
router.use(customerRouter);
router.use(vehicleRouter);
router.use(serviceRouter);
module.exports = router;