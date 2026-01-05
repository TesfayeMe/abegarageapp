const express = require('express');
const router = express.Router();
const installRouter = require('./intall.routes.js');
router.use(installRouter);
module.exports = router;