// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    // You can show a loading screen or just return null
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
