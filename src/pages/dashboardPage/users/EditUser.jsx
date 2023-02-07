import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'



function EditUser() {
    // const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    // console.log(id)
    // const [oldItem, setOldItem] = useState({})
    const [newItem, setNewItem] = useState({
        name: '',
        email: '',
        // password: '',
        // image: '',
        // mobile: '',
        // address: '',
        // role: 'user',
      })

    useEffect(() => {
    const access_token = localStorage.getItem('token')
    // console.log(token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
    // const headers = { Authorization: `Bearer ${token}` };
    axios.get(`http://127.0.0.1:8000/api/users/${id}`)
        .then(response => {
            setNewItem(response.data.data)
            console.log(response.data.data)
         });
    }, []);

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
      const handleApi = (e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append('image', newItem.image)
        formData.append('name', newItem.name)
        formData.append('email', newItem.email)
        // formData.append('password', newItem.password)
        console.log(formData.get('image'))
        console.log(formData.get('name'))
        console.log(formData.get('email'))
        // we used method post coz the laravel can't accept formData with method PUT
        const access_token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
        axios.post(`http://127.0.0.1:8000/api/users/edit/${id}`, formData)
            .then(response =>{
                navigate("/dashboard/users");
                console.log(response)
            } ).catch(e => console.log(e));

      }
    
  return (
    <div className='container'>
         <Form onSubmit={(e)=> handleApi(e)} className='' encType='multipart/form-data' >
      <div className="row">
        {/* <div className="col"> */}
          <Form.Group className="mb-3" >
            <Form.Label> Name</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="name" value={newItem.name} type="text" placeholder="ex: john" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        {/* </div> */}
        {/* <div className="col"> */}
          {/* <Form.Group className="mb-3" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="lastName" value={newItem.lastName} type="text" placeholder="ex: doe" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group> */}
        {/* </div> */}
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="email" value={newItem.email} type="text" placeholder="ex: john@gmail.com" />
          </Form.Group>
        </div>
        {/* <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="password" value={newItem.password} type="text" placeholder="ex: o$sBs342" />
          </Form.Group>
        </div> */}
      </div>
      <div className="row">
        <div className="col">
          {/* <Form.Group className="mb-3" >
            <Form.Label>mobile</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="mobile" value={newItem.mobile} type="text" placeholder="ex: 0096787066999" />
          </Form.Group> */}
        </div>
        <div className="col">
          {/* <Form.Group className="mb-3" >
            <Form.Label>Address</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="address" value={newItem.address} type="text" placeholder="ex: New York" />

          </Form.Group> */}
        </div>
        <div className="col">
          {/* <Form.Group className="mb-3" >
            <Form.Label>Role</Form.Label>
            <FormSelect onChange={(e)=> handleInput(e)} id="role"  defaultValue={newItem.role && 'user'} >
              
              <option  >user</option>
              <option >admin</option>
            </FormSelect>
          </Form.Group> */}
        </div>
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>image</Form.Label>
            <Form.Control onChange={handleImage} type="file" name='image' id='image' />
          </Form.Group>
        </div>
      </div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default EditUser