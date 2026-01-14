const express = require('express');
const router = express.Router();
const installRouter = require('./install.routes.js');
//import other routers
const employeeRouter = require('./employee.routes.js');
//use the imported routers
//import loginRouter from './login.routes.js';
const loginRouter = require('./login.routes.js');
router.use(loginRouter);
router.use(installRouter);
router.use(employeeRouter);
module.exports = router;