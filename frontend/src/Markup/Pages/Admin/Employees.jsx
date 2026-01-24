import React from "react";
import { useAuth } from "../../../Context/AuthContext";
import LoginForm from "../../Components/LoginForm/LoginForm";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import EmployeesList from "../../Components/Admin/EmployeesList/EmployeesList";
const Employees = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  if (isLoggedIn) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmployeesList/>
          </div>
        </div>
      </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>
            You are not authorized to access this page
          </h2>
        </div>
      )
    }
  }
  else
  {
    return (
      <div>
        <LoginForm/>
      </div>
    )
  }
};

export default Employees;
