import React from 'react'
import { FaBuffer,  FaRProject,  FaShoppingBag, FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './sidebar.css'

const menuItem = [
    {
        path: '/users',
        name: 'users',
        icon: <FaUsers />
    },
    {
        path: '/categories',
        name: 'categories',
        icon: <FaBuffer />
    },
    {
        path: '/products',
        name: 'products',
        icon: <FaShoppingBag />
    },
]
function Sidebar({isOpen}) {
  return (
    <div className='sidebar'>
        <div className="title">
         <FaRProject />
         <span className='title_head' style={{display:isOpen ? 'inline-block' : 'none', marginLeft:"10px"}}> project</span>
        </div>
        {/* <hr /> */}
        {
            menuItem.map((item, index)=>(
                <NavLink to={`/dashboard${item.path}`} key={index} className="link">
                    {item.icon}
                    <span style={{display:isOpen ? 'inline-block' : 'none', marginLeft:"10px"}} className="text_name">{item.name}</span>
                </NavLink>
            ))
        }
    </div>
  )
}

export default Sidebar