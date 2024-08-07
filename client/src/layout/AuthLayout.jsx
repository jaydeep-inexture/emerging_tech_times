import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuth = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.user);

  const isNotAdmin = user && !user.isAdmin;

  if (!isAuth || isNotAdmin) {
    return <Navigate to="/" replace={true} />;
  }

  return user && <Outlet />;
};

export default AuthLayout;
