import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useSelector((state) => state.user);

  if (user && (!user.accessToken || !user.isAdmin)) {
    return <Navigate to="/" replace={true} />;
  }

  return user && <Outlet />;
};

export default AuthLayout;
