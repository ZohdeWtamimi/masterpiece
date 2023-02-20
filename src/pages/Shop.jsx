import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Products from '../components/Products/Products';
import Pagination from '../components/pagination/Pagination';
import Header from '../components/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import './shop.css'
import { fetchItems } from '../store/DashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, insertProduct } from '../store/ProductSlice';


function Shop() {
  const {dashboards, loading} = useSelector((state) => state.dashboard)
  // console.log(dashboards)
  // const [posts, setPosts] = useState([])
  // const [images, setImages] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [currnetPage, setCaurrenPage] = useState(1);
  // const [postsPerPage] = useState(12);

  const [data , setData] = useState([])
  const [filterData , setFilterData] = useState({
    minPrice: '',
    maxPrice: ''
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts('')).then(res => {
      // console.log(res.payload)
      setData(res.payload.data)
    });
    // dispatch(fetchItems('products')).then(res => {
    //   // console.log(res.payload)
    //   setData(res.payload.data)
    // });
  }, [dispatch,setData]);
  
  const handleBlur = (e)=>{
    const {name,value}=e.target;
    console.log(value)
    const newFilter = {...filterData}
    newFilter[name] = value
    setFilterData(newFilter)
    const formData = new FormData()
    formData.append('minPrice', newFilter.minPrice)
    formData.append('maxPrice', newFilter.maxPrice)
        console.log(newFilter)
    const send = {
      section:'products/filter',
      formData
    }
    console.log(send)
    dispatch( insertProduct(send) ).unwrap()
    .then((res) => {
      console.log(res);
    });
        // axios.post(`http://127.0.0.1:8000/api/products/filter`, formData)
        //     .then(response =>{
        //         console.log(response)
        //     } ).catch(error =>{
        //       console.log(error)
        //   });
  }


  // console.log(filterData)
  // const indexOfLastPagePost = currnetPage * postsPerPage;
  // const indexOfFirstpage = indexOfLastPagePost - postsPerPage;
  // const currnetPosts = posts.slice(indexOfFirstpage, indexOfLastPagePost)
  // const currnetImage = images.slice(indexOfFirstpage, indexOfLastPagePost)
// console.log(images)
// console.log(currnetImage)
  // const paginate = (pageNumber)=> setCaurrenPage(pageNumber)
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
      <div className="accordion w-100" id="accordionExample">
        {/* start accordion */}
        <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <strong>price</strong>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <div className="d-flex justify-content-around">
                      <div  >
                        <label htmlFor="">MIN Price</label>
                        <input style={{width:'100px', display:'block'}} onBlur={handleBlur}  type="number" name='minPrice' defaultValue={filterData.minPrice} />
                      </div>
                      <div >
                        <label htmlFor="">MAX Price</label>
                        <input style={{width:'100px',display:'block'}} onBlur={handleBlur} type="number" name='maxPrice' defaultValue={filterData.maxPrice} />
                      </div>
                    </div>
                  </div>
                </div>
        </div>
        {/* end accordion */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Condition
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Accordion Item #3
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
          {/* <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div>
          <div>hello</div> */}
        </div>
        <div className="col-lg-9 col-md-12 col-sm-12 ">
        <div className="d-flex justify-content-between align-items-center mini">
          {/* <Pagination 
          // className="pagination"
          postsPerPage={postsPerPage} 
          totalPosts={posts.length} 
          paginate={paginate} /> */}
          {/* <p className=''>Showing {indexOfFirstpage ? indexOfFirstpage : 1} to {indexOfLastPagePost} of {posts.length} | page: {currnetPage} </p> */}
        </div>
        <Products data={data}  />
        {/* <Pagination 
        postsPerPage={postsPerPage} 
        totalPosts={posts.length} 
        paginate={paginate} /> */}
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Shop