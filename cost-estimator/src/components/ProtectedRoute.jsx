import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  // If user is not authenticated, redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // If user is logged in, show the child components or nested routes
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
