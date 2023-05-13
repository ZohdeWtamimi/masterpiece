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
    console.log('hello')
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



  return (
    <>
    <Header />
    <div style={{background: "#EDF1F8"}} >
    <div className='container pb-5 pt-3'>
      <div className="d-flex justify-content-between align-items-center">
      <h1 className='mb-3'>shop</h1>
      <div></div>
      <nav>
          <ul className='path'>
              <li><Link className='deleteDeco' to="/">Home </Link><span>/</span></li>
              <li className='text-muted'> shop </li>
          </ul>
      </nav>
      </div>
      
      <div className="row ">
        <div className="col-2 shadow  bg-light notRes">
          <div className="price-filter">
            <button>price</button>
              <div className="d-flex justify-content-around">
                  <div  >
                    <label htmlFor="" >MIN Price</label>
                    <input style={{width:'80px', display:'block'}} onBlur={handleBlur}  type="number" name='minPrice' defaultValue={filterData.minPrice} />
                  </div>
                  <div >
                    <label >MAX Price</label>
                    <input style={{width:'80px',display:'block'}} onBlur={handleBlur} type="number" name='maxPrice' defaultValue={filterData.maxPrice} />
                  </div>
              </div>
          </div>
        </div>
        <div className="col-lg-10 col-md-12 col-sm-12 ">
        <div className="d-flex justify-content-between align-items-center mini">
        </div>
        <Products data={data}  />
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Shop