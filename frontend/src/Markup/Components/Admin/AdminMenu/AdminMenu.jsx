import './AdminMenu.css'
const AdminMenu = () => {
    return (
        <div className='admin-menu-container'>
            <div className='admin-menu color-white'>
                <h2 className='color-white'>ADMIN MENU</h2>
            </div>

            <div className='list-group bg-transparent'>
                {/* Dashboard */}
                <a href='/admin/dashboard' className='list-group-item list-group-item-action bg-transparent'>Dashboard</a>
 {/* Orders */}
               
                <a href='/admin/view-orders' className='list-group-item list-group-item-action bg-transparent'>View Orders</a>
                 <a href='/admin/add-order' className='list-group-item list-group-item-action bg-transparent'>Add New Order</a>
                {/* Employees */}
                <a href='/admin/add-employee' className='list-group-item list-group-item-action bg-transparent'>Add Employee</a>
                <a href='/admin/view-employees' className='list-group-item list-group-item-action bg-transparent'>View Employees</a>

                {/* Customers */}
                <a href='/admin/add-customer' className='list-group-item list-group-item-action bg-transparent'>Add Customer</a>
                <a href='/admin/view-customers' className='list-group-item list-group-item-action bg-transparent'>View Customers</a>
               

                {/* Services */}
                <a href='/admin/add-service' className='list-group-item list-group-item-action bg-transparent'>Add Service</a>
                <a href='/admin/view-services' className='list-group-item list-group-item-action bg-transparent'>View Services</a>

                {/* Admin tools */}
                <a href='/admin/manage-roles' className='list-group-item list-group-item-action bg-transparent'>Manage Roles</a>
                <a href='/admin/reports' className='list-group-item list-group-item-action bg-transparent'>View Reports</a>
            </div>
        </div>
    )
}

export default AdminMenu
