import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import './subNav.css'

function SubNav({openIt, isOpen}) {
  return (
        <div className="subNav">
        <FaBars className='fabar' onClick={()=> openIt(!isOpen)} />
        <ul className='item-list'>
            {/* <li className='item'></li> */}
            <NavLink className="item" to='/'>
                home
            </NavLink>
            <NavLink className="item" to='/shop'>
                shop
            </NavLink>
            <NavLink className="item" to='/about'>
                about
            </NavLink>
        </ul>
    </div>
  )
}

export default SubNav