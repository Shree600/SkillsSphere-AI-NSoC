import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const { token } = useSelector((state) => state.auth);
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}