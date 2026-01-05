const express = require('express');
require('dotenv').config();
// create a variable to hold our port number
const PORT = process.env.PORT;
//create web server
const routes = require('./routes');
const app = express();
//middleware to parse json requests
app.use(express.json());
//use the routes defined in the routes folder
app.use(routes);
//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//export the app for use in other files (like testing)
module.exports = app;