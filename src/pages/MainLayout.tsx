import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="main__layout-body">
      <Outlet />
    </div>
  );
};
export default MainLayout;
