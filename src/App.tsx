import React, { Suspense } from 'react';
import './App.scss';
import './reset.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from 'pages/MainLayout';
import PublicRoute from 'router/PublicRoute';
import PrivateRoute from 'router/PrivateRoute';
import Loading from 'pages/Loading';

const Main = React.lazy(() => import('./pages/Main'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const UserRequests = React.lazy(() => import('./pages/UserRequests'));
const CompanyRequests = React.lazy(() => import('./pages/CompanyRequests'));
const ChangePassword = React.lazy(() => import('./pages/ChangePassword'));
const Devices = React.lazy(() => import('./pages/Devices'));
const Users = React.lazy(() => import('./pages/Users'));
const Summary = React.lazy(() => import('./pages/Summary'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const BatchDashboard = React.lazy(() => import('./pages/BatchDashboard'));

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route element={<PublicRoute />}>
                <Route path="/" element={<Main />} />
              </Route>
              <Route path="/change-password" element={<ChangePassword />} />
              <Route element={<PrivateRoute />}>
                <Route path="/user-req" element={<UserRequests />} />
                <Route path="/company-req" element={<CompanyRequests />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="/users" element={<Users />} />
                <Route path="/dashboard/:companyId" element={<Summary />} />
                <Route
                  path="/dashboard/:companyId/:deviceAlias"
                  element={<Dashboard />}
                />
                <Route path="/dashboard" element={<BatchDashboard />} />
              </Route>
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
