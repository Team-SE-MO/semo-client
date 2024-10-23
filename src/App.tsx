import React from 'react';
import './App.scss';
import './reset.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from 'pages/MainLayout';
import Main from 'pages/Main';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import UserRequests from 'pages/UserRequests';
import CompanyRequests from 'pages/CompanyRequests';
import ForgetPassword from 'pages/ForgetPassword';
import Devices from 'pages/Devices';
import Users from 'pages/Users';
import CompanyUsers from 'pages/CompanyUsers';
import Summary from 'pages/Summary';
import Dashboard from 'pages/Dashboard';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-req" element={<UserRequests />} />
            <Route path="/company-req" element={<CompanyRequests />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:companyid" element={<CompanyUsers />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
