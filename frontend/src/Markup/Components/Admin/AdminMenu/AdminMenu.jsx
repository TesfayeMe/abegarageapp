import './AdminMenu.css'
const AdminMenu = () => {
    return (
        <div className='admin-menu-container' >
            <div className='admin-menu color-white'>
                <h2 className='color-white'>ADMIN MENU</h2>
            </div>

            <div className='list-group bg-transparent'>
                {/* Dashboard */}
                <a href='/admin/dashboard' className='list-group-item list-group-item-action bg-transparent'>Dashboard</a>
                {/* Orders */}
                <a href='/admin/orders' className='list-group-item list-group-item-action bg-transparent'>Orders</a>
                <a href='/admin/new-order' className='list-group-item list-group-item-action bg-transparent'>New Order</a>
                {/* Employees */}
                <a href='/admin/add-employee' className='list-group-item list-group-item-action bg-transparent'>Add Employee</a>
                <a href='/admin/employees' className='list-group-item list-group-item-action bg-transparent'>Employees</a>

                {/* Customers */}
                <a href='/admin/add-customer' className='list-group-item list-group-item-action bg-transparent'>Add Customer</a>
                <a href='/admin/customers' className='list-group-item list-group-item-action bg-transparent'>Customers</a>
                {/* Services */}
                <a href='/admin/services' className='list-group-item list-group-item-action bg-transparent'>Services</a>


            </div>
        </div>
    )
}

export default AdminMenu
