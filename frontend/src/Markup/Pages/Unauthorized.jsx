import { useAuth } from "../../Context/AuthContext";
import LoginForm from "../Components/LoginForm/LoginForm";
import AdminMenu from "../Components/Admin/AdminMenu/AdminMenu";
import UnauthorizedUsers from '../Components/UnauthorizedUsers/UnauthorizedUsers';
const Unauthorized = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side w-100" style={{ backgroundColor: '#091435' }}>
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <UnauthorizedUsers />
              </div>
            </div>
          </div>
        </div>
      );
  }
  else {
    return (
      <div>
        <LoginForm />
      </div>
    )}

















}

export default Unauthorized