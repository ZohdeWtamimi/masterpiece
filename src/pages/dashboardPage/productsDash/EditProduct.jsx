import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, FormSelect } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'



function EditProduct() {
    const {id} = useParams()
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [newItem, setNewItem] = useState({
        productName: '',
        productPrice: '',
        productDescription: '',
        productDiscount: '',
        category_id:'cornex2',
        image: '',
      })
      useEffect(() => {
        const access_token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
        axios.get(`http://127.0.0.1:8000/api/categories`)
            .then(response => {
                setCategories(response.data.data)
                console.log(response.data)
             });
        }, []);
    useEffect(() => {
    const access_token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
    axios.get(`http://127.0.0.1:8000/api/products/${id}`)
        .then(response => {
            setNewItem(response.data.data)
            console.log(response.data.data)
         });
    }, [id]);

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
      }
      const handleApi = (e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append('image', newItem.image)
        formData.append('category_id', categories.find(e => e.CategoryName === newItem.category_id)?.id || 1)
        formData.append('productName', newItem.productName)
        formData.append('productPrice', newItem.productDiscount ? newItem.productPrice - ((newItem.productDiscount/100) * newItem.productPrice) :  newItem.productPrice)
        formData.append('productDescription', newItem.productDescription)
        formData.append('productDiscount', newItem.productDiscount)
        console.log(formData.get('image'))
        console.log(formData.get('category_id'))
        console.log(formData.get('productName'))
        console.log(formData.get('productPrice'))
        console.log(formData.get('productDescription'))
        console.log(formData.get('productDiscount'))
       
        // we used method POST coz the laravel can't accept formData with method PUT
        const access_token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
        axios.post(`http://127.0.0.1:8000/api/products/edit/${id}`, formData)
            .then(response =>{
                navigate("/dashboard/products");
                console.log(response)
            } ).catch(error =>{
              setError(error.response.data.message)
              console.log(error)
          });
      }
    
  return (
    <div className='container'>
       <form onSubmit={(e)=> handleApi(e)} >
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
  )
}

export default EditProduct