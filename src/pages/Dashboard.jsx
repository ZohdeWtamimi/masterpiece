import React, {  useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import SubNav from '../components/subnav/SubNav'
import './dashboard.css'
import Categories from './dashboardPage/categoriesDash/Categories'
import Products from './dashboardPage/productsDash/Products'
import Users from './dashboardPage/users/Users'

function Dashboard() {
  // if(localStorage.getItem('token')){
  //   console.log('hello')
  // }
    const [isOpen, setIsOpen] = useState(true)
    // const [showForm, setShowForm] = useState(false) 
    const {section} = useParams()
    const title = section?.slice(0, section.length - 1)
    
    const sections = [
      {
        name: "users",
        element: <Users />
      },
      {
        name: "categories",
        element: <Categories />
      },
      {
        name: "products",
        element: <Products isOpen={isOpen} />
      },
    ]
    const sectionToDisplay = sections.find(e => e.name === section);
    // console.log(sectionToDisplay)
    // console.log(param)
    const openIt = (toggle) => {
        setIsOpen(toggle)
        // console.log(isOpen)
    }
    
  return (
    <>
    <div className="parent" >
    <div className='sidebar' style={{ transition: "all .5s",}} >
    <Sidebar isOpen={isOpen} />
    </div>
      <div className='subnav d-block' style={{width: isOpen ? "85%" : "95%",left: isOpen ? "15%" : "5%", transition: "all .5s", marginLeft: "0"}}>
      <SubNav openIt={openIt} isOpen={isOpen} />
        <div className="view">
          <div className="container p-3">
            <div className="d-flex justify-content-between align-items-center p-3">
              
              <nav className='pathSpace'>
                  <ul style={{padding: "0px"}} className='pathDashboard'>
                      <li className='li'><Link className='pathLink' to="/"><FaHome /> Home </Link><span>/</span></li>
                      {title !== 'user' ? <li className='li'><Link className='pathLink' to="/shop">Shop </Link> <span>/</span></li> : ''}
                      <li className='text-muted'> {title} </li>
                  </ul>
              </nav>
             
              <div>
              {/* <button onClick={()=> setShowForm(!showForm)} className='addBtn'>Add {title}</button> */}
              </div>
            </div>
            <div className="p-3 rounded ">
                {sectionToDisplay && sectionToDisplay.element}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
    )
}

export default Dashboard