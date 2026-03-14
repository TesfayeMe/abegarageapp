import './AdminMenu.css'
const AdminMenu = () => {
    return (
        <div className='admin-menu-container' >
            <div className='admin-menu color-white'>
                <h2 className='color-white'>ADMIN MENU</h2>
            </div>

            <div className='list-group bg-transparent'>
                {/* Dashboard */}
                <a href='/dashboard' className='list-group-item list-group-item-action bg-transparent'>Dashboard</a>
                {/* Orders */}
                <a href='/orders' className='list-group-item list-group-item-action bg-transparent'>Orders</a>
                <a href='/mgr/new-order' className='list-group-item list-group-item-action bg-transparent'>New Order</a>
                {/* Employees */}
                <a href='/admin/add-employee' className='list-group-item list-group-item-action bg-transparent'>Add Employee</a>
                <a href='/mgr/employees' className='list-group-item list-group-item-action bg-transparent'>Employees</a>

                {/* Customers */}
                <a href='/mgr/add-customer' className='list-group-item list-group-item-action bg-transparent'>Add Customer</a>
                <a href='/mgr/customers' className='list-group-item list-group-item-action bg-transparent'>Customers</a>
                {/* Services */}
                <a href='/mgr/services' className='list-group-item list-group-item-action bg-transparent'>Services</a>


            </div>
        </div>
    )
}

export default AdminMenu
