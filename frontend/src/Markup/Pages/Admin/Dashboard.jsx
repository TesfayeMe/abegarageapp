import React from 'react'
import AdminDashboard from '../../Components/Admin/Dashboards/Dashboards'
import AdminMenu from '../../Components/Admin/AdminMenu/AdminMenu'
import { useAuth } from '../../../Context/AuthContext'
import LoginForm from '../../Components/LoginForm/LoginForm'
const Dashboard = () => {
  
  const { isLoggedIn, isAdmin } = useAuth();
  if (isLoggedIn) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side w-100" style={{backgroundColor: '#091435'}}>
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AdminDashboard/>
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
}

export default Dashboard