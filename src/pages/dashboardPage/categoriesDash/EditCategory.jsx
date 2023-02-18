import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, FormSelect } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'



function EditCategory() {
    const {id} = useParams()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [newItem, setNewItem] = useState({
        CategoryName: '',
        // email: '',
        // password: '',
        // image: '',
        // mobile: '',
        // address: '',
        // role: 'user',
      })

    useEffect(() => {
    const access_token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
    axios.get(`http://127.0.0.1:8000/api/categories/${id}`)
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
        formData.append('CategoryName', newItem.CategoryName)
        console.log(formData.get('image'))
        console.log(formData.get('CategoryName'))
       
        // we used method POST coz the laravel can't accept formData with method PUT
        const access_token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
        axios.post(`http://127.0.0.1:8000/api/categories/edit/${id}`, formData)
            .then(response =>{
                navigate("/dashboard/categories");
                console.log(response)
            } ).catch(error =>{
              setError(error.response.data.message)
              console.log(error)
          });
      }
    
  return (
    <div className='container'>
         <Form onSubmit={(e)=> handleApi(e)} className='' encType='multipart/form-data' >
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label> Name</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="CategoryName" value={newItem.CategoryName} type="text" placeholder="ex: john" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          </div>
          <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>image</Form.Label>
            <Form.Control onChange={handleImage} type="file" name='image' id='image' />
          </Form.Group>
        </div>
      </div>
      
      <div className="row">
        <Form.Text className="text-danger d-block mb-4" style={{fontSize: ".8rem"}}>
                {error}
        </Form.Text>
      </div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default EditCategory