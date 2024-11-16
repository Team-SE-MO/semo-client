import React from 'react';
import Footer from 'components/organisms/footer/Footer';
import Header from 'components/organisms/header/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout__container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default MainLayout;
