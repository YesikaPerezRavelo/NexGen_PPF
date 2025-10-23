// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");
//   const expiresAt = Number(localStorage.getItem("expiresAt") || 0);
//   const isValid = token && Date.now() < expiresAt;

//   // si no hay sesión válida → al login
//   if (!isValid) {
//     return <Navigate to="/login" replace />;
//   }

//   // si hay sesión, muestra la página
//   return children;
// }

// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function ProtectedRoute({ children, allow }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allow && !allow.includes(user.role)) return <Navigate to="/user" replace />;
  return children;
}
