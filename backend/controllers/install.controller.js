// import installService from "../services/install.services.js";
const installService = require('../services/install.services.js');
async function install(req, res, next) {
  const installMessage = await installService.install();
  if (installMessage.status === 200) {
    res.status(200).json({ message: installMessage });
  } else {
    res.status(500).json({ message: installMessage });
  }
}

module.exports = { install };
