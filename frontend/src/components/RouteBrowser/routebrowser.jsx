import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from '../../pages/FrontPage';
import Register from '../Register/register';
import Login from '../Login/login';

/* FrontPage is the index of the site */

export default function RouteBrowser() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
