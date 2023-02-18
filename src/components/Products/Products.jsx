import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addToCart } from '../../store/CartSlice';
import { fetchItems } from '../../store/DashboardSlice';

function Products({ data}) {
  // const {dashboards} = useSelector((state) => state.dashboard)
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
            {data && data.map((e, i) =>(
            <div key={i} className="col-lg-3 col-md-6 p-2 ">
                <div className="container p-2 shadow bg-light">
                <img style={{width:"100%", height: "150px"}} src={`http://127.0.0.1:8000/images/${e.url}`} alt="" />
                <p>{e.productName.substring(0,12)}...<Link to={`/shop/${e.id}`}>see more</Link> </p>
                <p>price: ${e.productPrice} <del>$700</del></p>
                <button className='btn btn-primary' onClick={()=> dispatch(addToCart(e))}>add to cart</button>
                </div>
              </div>
            ))}
    </div>
    
  )
}

export default Products