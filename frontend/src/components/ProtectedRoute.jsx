import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowGuests = false }) {
  const token = localStorage.getItem("token");
  
  if (!allowGuests && !token) return <Navigate to="/login" replace />;
  if (allowGuests && token) return <Navigate to="/dashboard" replace />;
  
  return children;
}