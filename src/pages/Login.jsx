import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Header from '../components/Header'
import { insertItem } from '../store/DashboardSlice'
import './login.css'
function Login() {
    const [newItem, setNewItem] = useState({
        email: '',
        password: '',
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
    // const send = {
    //     section: "login",
    //     newItem
    // }
    // console.log(send)
    // dispatch( insertItem(send) ).unwrap()
    // .then((res) => {
    //     localStorage.setItem('token', res.token)
    //     console.log(res);
    // });
    // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
        // const headers = { Authorization: `Bearer ${token}` };
        axios.post(`http://127.0.0.1:8000/api/login`, newItem)
            .then(response =>{
                localStorage.setItem('token', response.data.token)
                console.log(response)
            } );
    }
    // useEffect(() => {
    //     const access_token = localStorage.getItem('token')
    //     // console.log(token)
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
    //     // const headers = { Authorization: `Bearer ${token}` };
    //     axios.get(`http://127.0.0.1:8000/api/user`)
    //         .then(response => console.log(response.data) );
    //         // localStorage.removeItem('token')
    
    // }, []);
   
  return (
    <>
    <Header />
    <div className='d-flex'>
        <div className="registerImg">
        <img src="http://localhost:3000/images/register.jpeg" alt="" />
        </div>
        <div className='registerContent'>
            <h4>Login</h4>
            <p>Please enter personal information to continue</p>
            <div className="formContentLogin">
            <Form onSubmit={(e)=> handleApi(e)}>
            <Form.Group className="mb-3" >
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email"  onChange={(e)=> handleInput(e)} id="email" value={newItem.email} placeholder="ex: Zohde@gamil.com" />
                <Form.Text className="text-muted" style={{fontSize: ".8rem"}}>
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

export default Login