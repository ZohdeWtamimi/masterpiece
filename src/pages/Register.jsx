import React from 'react'
import { Button, Form } from 'react-bootstrap'
import Header from '../components/Header'
import './register.css'
function Register() {
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
            <Form>
            <div className="row">
                <div className="col-6">
                <Form.Group className="mb-3" >
                <Form.Label>first name</Form.Label>
                <Form.Control type="text" placeholder="ex: zohde" />
                
            </Form.Group>
                </div>
                <div className="col-6">
                <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="ex: tamimi" />
            </Form.Group>
                </div>
            </div>
            <Form.Group className="mb-3" >
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="ex: Zohde@gamil.com" />
                <Form.Text className="text-muted" style={{fontSize: ".8rem"}}>
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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