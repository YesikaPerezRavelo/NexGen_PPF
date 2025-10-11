import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const expiresAt = Number(localStorage.getItem("expiresAt") || 0);
  const isValid = token && Date.now() < expiresAt;

  // si no hay sesión válida → al login
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  // si hay sesión, muestra la página
  return children;
}
