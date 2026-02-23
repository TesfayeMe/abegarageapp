const serviceServices = require('../services/service.services');

const addServices = async (req, res)=>{
  console.log(req.body);
  const { service_name, service_description, employee_id } = req.body;
  const serviceData = {
    service_name, 
    service_description,
    employee_id
  }
  const addService = await serviceServices.addService(serviceData);
  console.log('addService', addService.insertId);
  if(!addService)
  {
    return res.status(400).json({
        status: false,
        message: 'Service not added'
    })
  }
  else
  {
    return res.status(201).json({
        status: true,
        message: "Service successfully added",
        data: addService
    })
  }
}
const getAllServices = async (req, res, next) =>{
  const allServices = await serviceServices.getAllServices();
  if(allServices)
  {
    console.log(allServices);
return res.status(200).json({
  status: true,
  message: allServices.length,
  data: allServices
})
  }
  else
  {
    return res.status(400).json({
      status: false,
      message: 'Service not found'
    })
  }
}
module.exports = {
    addServices,
    getAllServices
}