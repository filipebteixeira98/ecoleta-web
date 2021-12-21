import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="create-point" element={<CreatePoint />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
