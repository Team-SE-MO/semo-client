import { Footer } from 'components/organisms/footer/Footer';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="main__layout-body">
      <Outlet />
      <Footer />
    </div>
  );
};
export default MainLayout;
