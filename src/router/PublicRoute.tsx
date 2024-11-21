import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from 'store/useAuthStore';

const PublicRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const companyId = useAuthStore((state) => state.companyId);
  const role = useAuthStore((state) => state.role);

  const homePath = {
    ROLE_SUPER: '/dashboard',
    ROLE_ADMIN: `/dashboard/${companyId}`,
    ROLE_USER: `/dashboard/${companyId}`,
  };

  return isLoggedIn ? (
    <Navigate to={homePath[role as keyof typeof homePath]} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
