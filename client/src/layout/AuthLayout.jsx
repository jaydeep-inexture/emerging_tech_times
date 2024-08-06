import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const user = useSelector((state) => state.user);

  const isAuthenticated = user && user.accessToken;
  const isAdmin = user && user.isAdmin;

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};

export default AuthLayout;
