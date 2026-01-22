import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    api.get("/auth/check")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
