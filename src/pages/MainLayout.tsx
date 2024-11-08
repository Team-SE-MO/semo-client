import { Footer } from 'components/organisms/footer/Footer';
import Header from 'components/organisms/header/Header';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const hideHeaderFooterPaths = ['/login', '/signup'];
  const showHeaderFooter = !hideHeaderFooterPaths.includes(location.pathname);
  return (
    <div className="main-layout__container">
      {showHeaderFooter && <Header />}
      <Outlet />
      {showHeaderFooter && <Footer />}
    </div>
  );
};
export default MainLayout;
