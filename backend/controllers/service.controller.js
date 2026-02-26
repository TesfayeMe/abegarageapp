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
    // console.log(allServices);
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
const getServiceById = async (req, res, next) => {
  const {service_id} = req.params;
  const service = await serviceServices.getServiceById(service_id);
    if(service)
    {
      // console.log(service);
return res.status(200).json({
        status: true,
        message: 'Service found',
        data: service
      })
    }
    else
    {
      return res.status(404).json({
        status: false,
        message: 'Service not found'
      })
    }
}
const updateService = async (req, res, next) => {
  const dataToUpdate = req.body;
  
  const updatedService = await serviceServices.updateService(dataToUpdate);
  if(updatedService)
  {
    console.log(updatedService);
return res.status(200).json({
      status: true,
      message:'Service updated successfully'
    })
  }
  else
  {
    return res.status(400).json({
      status: false,
      message:'Service update failed'
    })
  }
}

const deleteService =  async (req, res, next) => {
  const {service_id} = req.params;
  const deleteService = await serviceServices.deleteService(service_id);
     if(deleteService)
     {
      return res.status(200).json({
        status: true,
        message: 'Service and orders based on this service deleted'
      })
     }
     else
     {
      return res.status(400).json({
        status: false,
        message: 'Service has not been deleted'
      })
     }
}
module.exports = {
    addServices,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
}