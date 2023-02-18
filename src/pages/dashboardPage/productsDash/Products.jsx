import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// import { fetchProducts, insertProduct } from '../../../store/ProductSlice';
import { deleteItem, fetchItems, insertItem } from '../../../store/DashboardSlice';
import axios from 'axios';

function Products({isOpen}) {
  const [showForm, setShowForm] = useState(false)
  const {section} = useParams()
  // const {  products, error } = useSelector((state) => state.product);
  const {dashboards} = useSelector((state) => state.dashboard)
  const [categories, setCategories] = useState([])
  const [newItem, setNewItem] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productDiscount: '',
    category_id:'cornex2',
    image: '',
  })
  
  const dispatch = useDispatch()
  useEffect(() => {
    const access_token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
    axios.get(`http://127.0.0.1:8000/api/categories`)
        .then(response => {
            setCategories(response.data.data)
            console.log(response.data)
         });
    }, []);
  // useEffect(() => {
  //   const access_token = localStorage.getItem('token')
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
  //   axios.get(`http://127.0.0.1:8000/api/users`)
  //       .then(response => {
  //           // setNewItem(response.data.data)
  //           console.log(response.data)
  //        });
  //   }, []);
  useEffect(() => {
    dispatch(fetchItems(section));
  }, [dispatch]);
  console.log(dashboards)
  // useEffect(() => {
  //   dispatch(fetchProducts(section));
  // }, [dispatch]);
  // console.log(products)
  const handleInput = (e)=>{
    const newData = { ...newItem }
    newData[e.target.id] = e.target.value
    setNewItem(newData)
    console.log(newData)
  }
  const handleImage = e =>{
    const newData = { ...newItem }
    newData['image'] = e.target.files[0]
    setNewItem(newData)
    console.log(newData)
    // setImagedata(e.target.files[0])
    // console.log(e.target.files)
  }
  const onDelete = (e)=>{
    if(!window.confirm('Are you sure you want to delete this user?')){
      return   
    }
    dispatch( deleteItem({section, newItem:{id:e.id} })).unwrap().then(e =>{
     console.log(e)
    })
    dispatch(fetchItems(section));
  }
  const handleApi = (e)=>{
    e.preventDefault();
    const formData = new FormData()
    formData.append('image', newItem.image)
    formData.append('category_id', categories.find(e => e.CategoryName === newItem.category_id).id)
    formData.append('productName', newItem.productName)
    formData.append('productPrice', newItem.productPrice)
    formData.append('productDescription', newItem.productDescription)
    formData.append('productDiscount', newItem.productDiscount)
    console.log(formData.get('image'))
    console.log(formData.get('category_id'))
    console.log(formData.get('productName'))
    console.log(formData.get('productPrice'))
    console.log(formData.get('productDescription'))
    console.log(formData.get('productDiscount'))
    const send = {
      section,
      formData
    }
    console.log(send)
    dispatch( insertItem(send) ).unwrap()
    .then((res) => {
      console.log(res);
    });
    // const access_token = localStorage.getItem('token')
    // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
    // axios.post(`http://127.0.0.1:8000/api/products`, formData)
    //     .then(response => {
    //         // setCategories(response.data.data)
    //         console.log(response.data)
    //      }).catch(error =>{
    //       // setError(error.response.data.message)
    //       console.log(error)
    //   });
  }
  return (
    <div>
      <div className="row">
        {/* hey zohde note: to delete you should use this line of code */}
        {/* <button onClick={()=> dispatch( deleteItem({section, newItem:{id:11} }) ) }>send</button> */}
      <div className='d-flex justify-content-between align-items-center ' style={{background: "#36454F"}}>
        <h2 style={{color: "#fff"}}>Products list</h2>
        <button onClick={()=> setShowForm(!showForm)} style={{background: "transparent", color:'#fff', borderColor: "#fff", borderRadius: "5px"}}>Add Product</button>
      </div>
      <div className='bg-light shadow' style={{transition: "ease-in .5s", height: showForm ? "420px" : "0", paddingTop: showForm ? "20px" : "0", paddingBottom: showForm ? "20px" : "0"}}>
        <form onSubmit={(e)=> handleApi(e)} style={{width: "80%", margin: "0 auto", display: showForm ? "block" : "none"}}>
          <div className="row">
              <div className="col">
                <div className="mb-3">
                  <input onChange={(e)=> handleInput(e)} value={newItem.productName} type="text" className="form-control" id="productName" placeholder='Product name' />
                  <div id="productName" className="form-text">We'll never share your email with anyone else.</div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <input onChange={(e)=> handleInput(e)} value={newItem.productPrice} type="number" className="form-control" id="productPrice" placeholder='product Price' />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col">
                <div className="mb-3">
                  <input onChange={(e)=> handleInput(e)} value={newItem.productDescription} type="text" className="form-control" id="productDescription" placeholder="Product description" />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col">
                <div className="mb-3">
                  <input onChange={(e)=> handleInput(e)} value={newItem.productDiscount} type="number" className="form-control" id="productDiscount" placeholder="Product discount" />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                <label htmlFor="category_id">category_id:</label>
                <select onChange={(e)=> handleInput(e)} id="category_id"  name='category_id'>
                  {categories && categories.map((e,i) =>(
                    <option key={i} value={e.CategoryName}>{e.CategoryName}</option>
                  ))}
                  
                </select>
                </div>
              </div>
              {/*  */}
              
              {/*  */}
              <div className="col">
                <div className="mb-3">
                  <label forhtml="pic" className="form-label">picture</label>
                  <input className="form-control" onChange={handleImage} type="file" name='image' id='image' />
                </div>
              </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
       
        {Array.isArray(dashboards.data) && dashboards.data.map((e,i) => (
           <div key={i} className="col-3 my-3">
           <Card style={{ width: '18rem' }}>
           {e.url ? <Card.Img variant="top" style={{height:"150px"}} src={`http://127.0.0.1:8000/images/${e.url}`} /> : <Card.Img variant="top" src="http://localhost:3000/images/slider1.jpg" /> } 
             <Card.Body>
               <Card.Title className='text-center'>{e.productName}</Card.Title>
               <div className="d-flex justify-content-between">
               <div className="d-flex">
                 <p style={{ fontWeight: "700"}}>$342</p>
                 <del className="text-muted" style={{marginLeft: "13px", fontWeight: "500"}}>$245</del>
               </div>
               <p className='bg-warning px-2 py-0 fw-bold text-light'>sale</p>
               </div>
               <Card.Text>
                 Some quick example text to build on the card title and make up the
                 bulk of the card's content.
               </Card.Text>
               <div className="d-flex justify-content-between align-items-center">
               <Button variant="danger" onClick={ev => onDelete(e)}>remove</Button>
               <Link className='btn btn-dark' to={'/dashboard/products/'+e.id}>edit</Link>
               {/* <Button variant="danger">remove </Button>
               <Button style={{ display:"inline-block"}} variant="dark">Edit </Button> */}
               </div>
             </Card.Body>
           </Card>
         </div>
        ))}
       
        
        
        
      </div>
    </div>
  )
}

export default Products