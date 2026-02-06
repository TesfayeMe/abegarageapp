import React from 'react'
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import AddCustomerForm from '../../Components/Admin/AddCustomerForm/AddCustomerForm';
import "./admin.css"
const AddCustomer = () => {
  return (
    <div>
         <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddCustomerForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCustomer