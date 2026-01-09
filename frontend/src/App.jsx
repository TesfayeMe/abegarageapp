import './App.css'
import './assets/styles/css/bootstrap.css'
import './assets/styles/css/style.css'
import './assets/styles/css/responsive.css'
import './assets/styles/css/color.css'
import {Routes, Route} from 'react-router-dom';
import Home from './Markup/Pages/Home';
import AddEmployee from './Markup/Pages/Admin/AddEmployee';
import Login from './Markup/Pages/Login';
import Header from './Markup/Components/Header/Header'
import Footer from './Markup/Components/Footer/Footer';
function App() {
  return (
    <>
    <Header/> 
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='admin/add-employee' element={<AddEmployee />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
