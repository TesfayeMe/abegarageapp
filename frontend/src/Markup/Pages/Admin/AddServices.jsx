import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import AddServiceForm from '../../Components/Admin/AddServiceForm/AddServiceForm';
import "./admin.css"

const AddServices = () => {
   return (
    <div>
         <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddServiceForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddServices