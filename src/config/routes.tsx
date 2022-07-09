import Account from 'pages/Account';
import AddProject from 'pages/AddProject';
import Config from 'pages/Config';
import Project from 'pages/Project';
import TimeTracking from 'pages/TimeTracking';
import UpdateProjectProgress from 'pages/UpdateProjectProgress';
import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import User from '../pages/User';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TimeTracking />} />
        <Route path='/timetracking' element={<TimeTracking />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/project' element={<Project />}></Route>
        <Route path='/addproject' element={<AddProject />} />
        <Route
          path='/updateprojectprogress'
          element={<UpdateProjectProgress />}
        />
        <Route path='/account' element={<Account />} />
        <Route path='/user' element={<User />} />
        <Route path='/config' element={<Config />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
