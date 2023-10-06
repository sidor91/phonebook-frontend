import { Navigate } from 'react-router-dom';
import { useAuth } from "@/utilites/hooks/useAuth";


export default function RestrictedRoute  ({ component: Component, redirectTo = '/' }) {
  const { isLoggedIn } = useAuth();

  return <>{isLoggedIn ? <Navigate to={redirectTo} /> : <Component />}</>;
};