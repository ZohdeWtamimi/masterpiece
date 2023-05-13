import React from 'react';
import './App.css';
// import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import SingleProduct from './pages/SingleProduct';
import Dashboard from './pages/Dashboard';
// import Users from './pages/dashboardPage/users/Users';
// import Products from './components/Products/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import EditUser from './pages/dashboardPage/users/EditUser';
import EditCategory from './pages/dashboardPage/categoriesDash/EditCategory';
import EditProduct from './pages/dashboardPage/productsDash/EditProduct';
import Cart from './pages/Cart';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/Shop/:id' element={<SingleProduct />} />
        {/* <Route path='/about' element={<About />} /> */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/:section' element={<Dashboard />} />
        <Route path='/dashboard/users/:id' element={<EditUser />} />
        <Route path='/dashboard/categories/:id' element={<EditCategory />} />
        <Route path='/dashboard/products/:id' element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;
