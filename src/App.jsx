import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import SingleProduct from './pages/SingleProduct';
import Dashboard from './pages/Dashboard';
import Users from './pages/dashboardPage/users/Users';
import Products from './components/Products/Products';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Shop' element={<Shop />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/Shop/:id' element={<SingleProduct />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard/:section' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
