import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  return localStorage.getItem("token") ? (
    <Navigate to={"/"} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
