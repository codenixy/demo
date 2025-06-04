import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getToken();
    setAuth(!!token);
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
