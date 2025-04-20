import { JSX } from "react";
import { Navigate } from "react-router-dom";
import  {useAuth}  from "./contexts/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>; // ou um spinner bonitinho
  }
  
  return user ? children : <Navigate to="/" replace />;
}