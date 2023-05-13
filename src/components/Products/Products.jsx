import React, { useEffect, useState } from 'react'
import { FaEye, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addToCart } from '../../store/CartSlice';
import { fetchItems } from '../../store/DashboardSlice';

function Products({ data}) {
  const {products} = useSelector((state) => state.product)
  console.log(products)
  const {cartItems, amount} = useSelector((state) => state.cart)
  // const [data , setData] = useState([])

  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchItems('products')).then(res => setData(res.payload));
  // }, [dispatch]);
  // console.log(data)
    // if(loading){
    //     return <h2>loading...</h2>
    // }
    // console.log(posts)
  return (
    <div className="row ">
            {  Array.isArray(products?.data) && products.data?.map((e, i) =>(
            <div key={i} className="col-lg-3 col-md-6 col-sm-8 p-2" >
                <div className="container  shadow bg-light"  style={{borderRadius: "3px",padding: '0'}}>
                <img style={{width:"100%", height: "150px"}} src={`http://127.0.0.1:8000/images/${e.url}`} alt="" />
                <div className='p-3 pb-3'>
                  <h5>{e.productName.substring(0,12)} </h5>
                  <p>price: ${ e.productPrice - ((e.productDiscount/100) * e.productPrice) } <del>${e.productPrice}</del></p>
                  {/* <div className='d-flex justify-content-between'> */}
                    <button className='btn btn-primary me-4' onClick={()=> dispatch(addToCart(e))}>add to cart</button>
                    <Link className='btn btn-warning me-2' style={{color:"#fff"}} to={`/shop/${e.id}`}><FaEye /></Link>
                    <button className='btn  me-2' style={{backgroundColor: '#E92266', color:"#fff"}} onClick={()=> dispatch(addToCart(e))}><FaHeart /></button>
                  {/* </div> */}
                </div>
                </div>
              </div>
            ))}
    </div>
    
  )
}

export default Products