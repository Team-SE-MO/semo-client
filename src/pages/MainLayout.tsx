import { Footer } from 'components/organisms/footer/Footer';
import Header from 'components/organisms/header/Header';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="main__layout-body">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default MainLayout;
