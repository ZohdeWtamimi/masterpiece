import React, { useState } from 'react'
import './Header.css'
import { BsFillPersonFill } from "react-icons/bs";
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


function Header() {
    const {amount} = useSelector((state)=> state.cart)
    const [openNav, setOpenNav] = useState(false)
    const navigate = useNavigate()
    function logout (){
         const access_token = localStorage.getItem('token')
        // console.log(token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
        // const headers = { Authorization: `Bearer ${token}` };
        axios.post(`http://127.0.0.1:8000/api/logout`)
            .then(response => console.log(response) );
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
    }
  return (
    <>
    <nav className="nav">
    <Link to="/" className="site-title">
      Car Parts
    </Link>
    <ul className='notResUl'>
        <li>
            <Link className='a' to="/home">Home</Link>
        </li>
        <li>
            <Link className='a' to="/shop">shop</Link>
        </li>
        {localStorage.getItem('user')?.role== 'admin' && 
        <li>
        <Link className='a' to="/dashboard">dashboard</Link>
        </li>}
        <li>
            <Link className='a' to="/register">Register</Link>
        </li>
        {!localStorage.getItem('user') &&
        <li>
        <Link className='a' to="/login">Login</Link>
        </li>}
        {localStorage.getItem('user') && <li>
            <Link className='a' to="/cart">cart</Link>
        </li>}
    </ul >
        {localStorage.getItem('user') && <div className='me-3 ' style={{width: '250px'}}>
            <button onClick={logout} style={{marginRight:'40px',padding:"5px"}}>logout</button>
            < BsFillPersonFill className='icon' />
        <span className='m-4'>|</span>
        <Link className='' style={{display:"inline"}} to="/cart">
            <span className='rel'>
            <FaShoppingCart className='cart' style={{background: "transparent"}} />
            <span className='cout-item'>{amount}</span>
            </span>
        </Link>
        </div>}
        <div onClick={()=> setOpenNav(!openNav)} className="openNav">
        <FaBars />
        </div>
  </nav>
     <div style={{transform: openNav ? "translateX(600px)": 'translateX(0px)'}} className="responsive">
        <div className='inRes'>
            < BsFillPersonFill className='icon' style={{fontSize:"2rem"}} />
            <span className='m-4'>|</span>
            <Link className='' style={{display:"inline", color:'#fff'}} to="/cart">
                <span className='rel'>
                <FaShoppingCart className='cart' style={{fontSize:"2rem"}} />
                <span className='cout-item'>{amount}</span>
                </span>
            </Link>
        </div>
        <ul className='resUl'>
                <Link className='resLink' to="/register">
                    <li className='resLi'>
                            Register
                    </li>
                </Link>
                <Link className='resLink' to="/login">
                    <li className='resLi'>
                            Login in
                    </li>
                </Link>
            <Link className='resLink' to="/shop">
                <li className='resLi'>
                        shop
                </li>
            </Link>
                {/* <Link className='resLink' to="/about">
                    <li className='resLi'>
                            About
                    </li>
                </Link> */}
                <Link className='resLink' to="/dashboard">
                    <li className='resLi'>
                            dashboard
                    </li>
                </Link>
        </ul>
    </div>
  </>
  )
}

export default Header

{/* <>
<nav className="nav">
<Link to="/" className="site-title">
  Site Name
</Link>
<ul className='notResUl'>
    <li>
        <Link className='a' to="/shop">shop</Link>
    </li>
    <li>
        <Link className='a' to="/about">About</Link>
    </li>
    <li>
        <Link className='a' to="/dashboard">dashboard</Link>
    </li>
    <li>
        <Link className='a' to="/register">Register</Link>
    </li>
    <li>
        <Link className='a' to="/login">Login</Link>
    </li>
    <li>
        <Link className='a' to="/cart">cart</Link>
    </li>
</ul >
    <div className='me-3'>
        <button onClick={logout} style={{marginRight:'40px',padding:"5px"}}>logout</button>
        < BsFillPersonFill className='icon' />
    <span className='m-4'>|</span>
        <span className='rel'>
        <FaShoppingCart className='cart' style={{background: "transparent"}} />
        <span className='cout-item'>{amount}</span>
        </span>
    </div>
    <div onClick={()=> setOpenNav(!openNav)} className="openNav">
    <FaBars />
    </div>
</nav>
 <div style={{transform: openNav ? "translateX(300px)": 'translateX(0px)'}} className="responsive">
    <div className='inRes'>
        < BsFillPersonFill className='icon' />
        <span className='m-4'>|</span>
        <span className='rel'>
        <FaShoppingCart className='cart' />
        <span className='cout-item'>0</span>
        </span>
    </div>
    <ul className='resUl'>
            <Link className='resLink' to="/register">
                <li className='resLi'>
                        Register
                </li>
            </Link>
            <Link className='resLink' to="/login">
                <li className='resLi'>
                        Login in
                </li>
            </Link>
        <Link className='resLink' to="/shop">
            <li className='resLi'>
                    shop
            </li>
        </Link>
            <Link className='resLink' to="/about">
                <li className='resLi'>
                        About
                </li>
            </Link>
            <Link className='resLink' to="/dashboard">
                <li className='resLi'>
                        dashboard
                </li>
            </Link>
    </ul>
</div>
</> */}