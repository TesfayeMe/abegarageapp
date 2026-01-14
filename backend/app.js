const express = require('express');
require('dotenv').config();
// create a variable to hold our port number
const PORT = process.env.PORT;
//create web server
const sanitize = require('sanitize');
//import cors middleware
const cors = require('cors');
//use cors middleware
const routes = require('./routes');
const app = express();
//options for cors middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
// add the sanitizer middleware
app.use(sanitize.middleware);
//use the routes defined in the routes folder
app.use(routes);
//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//export the app for use in other files (like testing)
module.exports = app;