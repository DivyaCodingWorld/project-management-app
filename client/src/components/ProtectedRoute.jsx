import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // अगर token नहीं है → login page भेज दो
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}