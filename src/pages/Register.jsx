import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Header from '../components/Header'
import { insertItem } from '../store/DashboardSlice'
import './register.css'
function Register() {
    const [newItem, setNewItem] = useState({
        name: '',
        email: '',
        password: '',
        // mobile: '',
        // address: '',
        // role: 'user',
      })
      const handleInput = (e)=>{
        const newData = { ...newItem }
        newData[e.target.id] = e.target.value
        setNewItem(newData)
        // console.log(newData)
      }
    const dispatch = useDispatch()
    const handleApi = (e)=>{
    e.preventDefault();
    const send = {
        section: "signup",
        newItem
    }
    console.log(send)
    dispatch( insertItem(send) ).unwrap()
    .then((res) => {
        localStorage.setItem('token', res.token)
        console.log(res.token);
    });
    }
    
  return (
    <>
    <Header />
    <div className='d-flex'>
        <div className="registerImg">
        <img src="http://localhost:3000/images/register.jpeg" alt="" />
        </div>
        <div className='registerContent'>
            <h4>create Account</h4>
            <p>Please enter personal information to continue</p>
            <div className="formContent">
            <Form onSubmit={(e)=> handleApi(e)}>
            
                <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" onChange={(e)=> handleInput(e)} id="name" value={newItem.name} placeholder="ex: tamimi" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" onChange={(e)=> handleInput(e)} id="email" value={newItem.email} placeholder="ex: Zohde@gamil.com" />
                <Form.Text className="text-muted"  style={{fontSize: ".8rem"}}>
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e)=> handleInput(e)} id="password" value={newItem.password} placeholder="Password" />
            </Form.Group>
            <Button variant="dark" type="submit">
                Submit
            </Button>
            </Form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register