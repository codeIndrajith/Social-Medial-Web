import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, [token]);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
