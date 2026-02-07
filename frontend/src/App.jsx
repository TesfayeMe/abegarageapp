import './App.css'
import './assets/styles/css/bootstrap.css'
import './assets/styles/css/style.css'
import './assets/styles/css/responsive.css'
import './assets/styles/css/color.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Markup/Pages/Home';
import AddEmployee from './Markup/Pages/Admin/AddEmployee';
import Login from './Markup/Pages/Login';
import Header from './Markup/Components/Header/Header'
import Footer from './Markup/Components/Footer/Footer';
import Unauthorized from './Markup/Pages/Unauthorized'
import PrivateAuthRoute from './Markup/Components/Auth/PrivateAuthRoute'
import Orders from './Markup/Pages/Admin/Orders';
import Customers from './Markup/Pages/Admin/Customers';
import Employees from './Markup/Pages/Admin/Employees';
import { useAuth } from './Context/AuthContext'
import EditEmployee from './Markup/Components/Admin/EditEmployee/EditEmployee'
import Dashboard from './Markup/Pages/Admin/Dashboard'
import AddCustomer from './Markup/Pages/Admin/AddCustomer';
import EditCustomers from './Markup/Pages/Admin/EditCustomers';
function App() {
    return (
      <>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/add-employee' element={<PrivateAuthRoute roles={[3]}><AddEmployee /></PrivateAuthRoute>} />
          <Route path='/admin/add-customer' element={<PrivateAuthRoute roles={[3]}><AddCustomer /></PrivateAuthRoute>} />
          <Route path='/admin/dashboard' element={<PrivateAuthRoute roles={[3]}><Dashboard /></PrivateAuthRoute>} />
          <Route path='/admin/orders' element={<PrivateAuthRoute roles={[1, 2, 3]}><Orders /></PrivateAuthRoute>} />
          <Route path='/admin/customers' element={<PrivateAuthRoute roles={[2, 3]}><Customers /></PrivateAuthRoute>} />
          <Route path='/admin/edit-customer' element={<PrivateAuthRoute roles={[2, 3]}><EditCustomers /></PrivateAuthRoute>} />
          <Route path='/admin/employees' element={<Employees />} />
          <Route path='/admin/edit-employee' element={<EditEmployee employee_id={Option} />} />
        </Routes>
        <Footer />
      </>
    )
}

export default App
