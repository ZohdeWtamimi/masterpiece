import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import './singleProduct.css'
import { BsFillStarFill, BsStar } from 'react-icons/bs'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '../store/DashboardSlice'
import { fetchProducts } from '../store/ProductSlice'



function SingleProduct() {
    const  {id} = useParams()
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const [star, setStar] = useState(0)
    const [confirm, setConfirm] = useState(false)
    const [body, setBody] = useState('')
    // const [product, setProduct] = useState([])
    const {dashboards} = useSelector((state) => state.dashboard)
    // console.log(dashboards)
    const {products, loading} = useSelector((state) => state.product)
    console.log(products)
    // console.log(dashboards.data)
    useEffect(() => {
      // const access_token = localStorage.getItem('token')
      // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
      // axios.get(`http://127.0.0.1:8000/api/products/${id}`)
      //     .then(response => {
      //         setProduct(response.data.data)
      //         console.log(response.data.data)
      //      });
      // just comment
      dispatch(fetchProducts(`/${id}`));
      }, [id, dispatch]);
    // useEffect(() => {
      
    //   dispatch(fetchItems(`products/${id}`));
    //   },[]);
    // const product = posts.find(p => p.id === parseInt(id))
    const handleClick = (i)=>{
      console.log(i)
      setStar(i)
    }
    const handleCommentSubmit = (e)=>{
      e.preventDefault()
      let data = {
        body:body,
        user_id: JSON.parse(localStorage.getItem('user')).id || 0,
        product_id: +id
      }
      console.log(data)
      axios.post(`http://127.0.0.1:8000/api/comments`, data)
            .then(response =>{
                console.log(response)
                dispatch(fetchProducts(`/${id}`));
                setBody('')
            } ).catch(error =>{
              console.log(error)
          });
          // just comment
    }
    const handleCommnetChange = (e)=>{
      setBody(e.target.value)
    }
    // if(loading){
    //   return <h2>loading...</h2>
    // }
    const confirmDelete = ()=>{
      console.log("open")
      setConfirm(!confirm)
    }
    const removeItem = ()=>{
      console.log('yes')
      setConfirm(false)
    }
  return (
    <>
    <Header/>
    <div className='container my-4'>
        <div className="d-flex justify-content-between my-4 ">
            <h2 className="">title</h2>
            <nav>
                <ul className='path'>
                    <li><Link className='deleteDeco' to="/">Home </Link><span>/</span></li>
                    <li><Link className='deleteDeco' to="/shop">Shop </Link> <span>/</span></li>
                    <li className='text-muted'> title </li>
                </ul>
            </nav>
        </div>
        <div className="row">
        <div className="col-lg-6 col-sm-12">
           {products.data && <img className='mainPic' src={`http://127.0.0.1:8000/images/${products.data.url}`} height={'200'} alt="" />} 
        </div>
        <div className="col-lg-6 col-sm-12 d-flex flex-column justify-content-around">
            <h2> { products.data?.productName}</h2>
            <div>
              {[1,2,3,4,5].map((_,i) => star > i ? 
              <BsFillStarFill  
              key={i}
              onClick={()=> handleClick(i+1)}
              style={{color:"gold", marginLeft: "5px", cursor:"pointer", fontSize:"1.5rem"}}
              /> 
              : 
              <BsStar 
              key={i}
              onClick={()=> handleClick(i+1)}
              style={{color:"gold", marginLeft: "5px", cursor:"pointer", fontSize:"1.5rem"}} 
              />
              )}
            </div>
            <div><span className='fw-bold'>STATUS: </span> used</div>
            <p>{products.data?.productDescription}</p>
            <h4> ${products.data?.productPrice} <del className='text-muted'>$700</del></h4>
            <div>
            <button className='btn btn-primary'><FaShoppingCart className='cart' /> ADD TO CART</button>
            <button onClick={confirmDelete} className='btn' style={{background:"#E92266",marginLeft:"10px",color:"#fff"}}><FaHeart /> LOVE</button>
            </div>
        </div>
        </div>
        <div className={confirm ? "confirm" : "none"}>
          <button >no</button>
          <button onClick={removeItem}>yes</button>
        </div>



          {/* related */}
          <div className="related">
            <div className="realted-container">
              
            </div>
          </div>
          {/* end related */}

{/* comment */}


      {true && <div className='my-5'>
              <div className='btns'>
                <button className='btn-comments'>COMMENTS</button>
                <button className='btn-relateds'>RELATED</button>
                <button className='addtion-span'></button>
              </div>
              <div className="comments-body">
                {products.data?.comments?.map(e =>(
                  <div key={e.id} className="comment">
                  <div className='comment-content'>
                    <img width={'50'} height={'50'} className='comment-img' src={`http://127.0.0.1:8000/images/${e.user_url}`} alt="" />
                    <span className='comment-date'>{e.user_name}</span>
                  </div>
                  <p className="comment-body">
                    {e.body}
                  </p>
                </div>
                ))}
                
              </div>
            <form onSubmit={handleCommentSubmit}>
              <input type="text" onChange={handleCommnetChange} value={body}/>
              <button type='submit'>add comment</button>
            </form>
      </div>}



        {/* end comments */}
    </div>
    <Footer />
    </>
  )
}

export default SingleProduct