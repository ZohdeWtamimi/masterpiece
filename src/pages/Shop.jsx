import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Products from '../components/Products/Products';
import Pagination from '../components/pagination/Pagination';
import Header from '../components/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import './shop.css'


function Shop() {
  const [posts, setPosts] = useState([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [currnetPage, setCaurrenPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data)
      setLoading(false);
    }
    fetchPosts()
    const fetchImage = async ()=>{
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/photos');
      setImages(res.data.slice(0, 100))
      setLoading(false);
    }
    fetchImage()
  }, [])

  const indexOfLastPagePost = currnetPage * postsPerPage;
  const indexOfFirstpage = indexOfLastPagePost - postsPerPage;
  const currnetPosts = posts.slice(indexOfFirstpage, indexOfLastPagePost)
  const currnetImage = images.slice(indexOfFirstpage, indexOfLastPagePost)
// console.log(images)
// console.log(currnetImage)
  const paginate = (pageNumber)=> setCaurrenPage(pageNumber)
  return (
    <>
    <Header />
    <div style={{background: "#EDF1F8"}} >
    <div className='container pb-5 pt-3'>
      <div className="d-flex justify-content-between align-items-center">
      <h1 className='mb-3'>shop</h1>
      <nav>
          <ul className='path'>
              <li><Link className='deleteDeco' to="/">Home </Link><span>/</span></li>
              <li className='text-muted'> shop </li>
          </ul>
      </nav>
      </div>
      
      <div className="row ">
        <div className="col-3 shadow text-light bg-light notRes">
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
        </div>
        <div className="col-lg-9 col-md-12 col-sm-12 ">
        <div className="d-flex justify-content-between align-items-center mini">
          <Pagination 
          // className="pagination"
          postsPerPage={postsPerPage} 
          totalPosts={posts.length} 
          paginate={paginate} />
          <p className=''>Showing {indexOfFirstpage ? indexOfFirstpage : 1} to {indexOfLastPagePost} of {posts.length} | page: {currnetPage} </p>
        </div>
        <Products posts={currnetPosts} images={currnetImage} loading={loading} />
        <Pagination 
        postsPerPage={postsPerPage} 
        totalPosts={posts.length} 
        paginate={paginate} />
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Shop