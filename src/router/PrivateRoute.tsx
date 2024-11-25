import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from 'store/useAuthStore';
import Swal from 'sweetalert2';

const PrivateRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    Swal.fire({
      title: '알림',
      text: '로그인이 필요한 기능입니다.',
      icon: 'warning',
      confirmButtonText: '확인',
    });
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
