import React, { useState } from 'react'
import './Header.css'
import { BsFillPersonFill } from "react-icons/bs";
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Header() {
    const [openNav, setOpenNav] = useState(false)
  return (
    <>
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
    </ul >
        <div className='me-3'>
            < BsFillPersonFill className='icon' />
        <span className='m-4'>|</span>
            <span className='rel'>
            <FaShoppingCart className='cart' />
            <span className='cout-item'>0</span>
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
  </>
  )
}

export default Header