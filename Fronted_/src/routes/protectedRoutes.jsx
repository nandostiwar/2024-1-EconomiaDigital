import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  let auth = { token: false };

  if (sessionStorage.getItem("token")) {
    auth = { token: true };
  } else {
    auth = { token: false };
  }

  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;