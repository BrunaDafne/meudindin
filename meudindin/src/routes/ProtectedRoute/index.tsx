// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  // Verifica se o usuário está autenticado
  const user = localStorage.getItem("token");
  return user !== null;
};

export const ProtectedRoute = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
