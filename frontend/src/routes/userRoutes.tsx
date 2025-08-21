import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Portfolio from '../pages/user/portfolio';

export default function UserRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Portfolio />}>

        </Route>
    </Routes>
  )
}
