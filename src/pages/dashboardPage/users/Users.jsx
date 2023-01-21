import React, { useEffect, useState } from 'react'
import { Button, Form, FormSelect } from 'react-bootstrap'
import { FaUserPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchItems, insertItem } from '../../../store/DashboardSlice';
import './users.css'

function Users() {
  const [showForm, setShowForm] = useState(false) 
  const [newItem, setNewItem] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    role: 'user',
  })
  const dispatch = useDispatch()
  const {section} = useParams()
  // users
  const {dashboards} = useSelector((state) => state.dashboard)
  // fetch users
  useEffect(() => {
    dispatch(fetchItems(section));
  }, [dispatch]);
  // console.log(dashboards)
  const handleInput = (e)=>{
    const newData = { ...newItem }
    newData[e.target.id] = e.target.value
    setNewItem(newData)
    // console.log(newData)
  }

  // send data to api
  const handleApi = (e)=>{
    e.preventDefault();
    const send = {
      section,
      newItem
    }
    // console.log(send)
    dispatch( insertItem(send) ).unwrap()
    .then((res) => {
      console.log(res);
    });
  }
  return (
    <>
    <div className='over'>
    <div className='p-2 d-flex justify-content-between align-items-center' style={{backgroundColor:"#36454F"}}>
       <h2 style={{color: "#fff", fontSize: "1.3rem",  fontWeight: "bold" }}>User List</h2>  
        <button onClick={()=> setShowForm(!showForm)} className='addBtn' style={{border: "1px solid #EDF1F8"}}><FaUserPlus /> Add User</button>
    </div>
     
    <div className="container p-4  shadow pt-2 disappear" style={{transform: showForm ? "translateX(1500px)": 'translateX(0px)', transition: "all .5s"}}>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >Larry the Bird</td>
              <td >Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
    </div>
    <div className='appear container' style={{zIndex:showForm ? "1" : "-1", top:"10%", position: "absolute", transition:showForm? "ease-in .3s": "", width: "100%"}}>
    <Form onSubmit={(e)=> handleApi(e)} className='' >
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="firstName" value={newItem.firstName} type="text" placeholder="ex: john" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="lastName" value={newItem.lastName} type="text" placeholder="ex: doe" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="email" value={newItem.email} type="text" placeholder="ex: john@gmail.com" />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="password" value={newItem.password} type="text" placeholder="ex: o$sBs342" />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>mobile</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="mobile" value={newItem.mobile} type="text" placeholder="ex: 0096787066999" />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>Address</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="address" value={newItem.address} type="text" placeholder="ex: New York" />

          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>Role</Form.Label>
            <FormSelect onChange={(e)=> handleInput(e)} id="role"  defaultValue={newItem.role && 'user'} >
              
              <option  >user</option>
              <option >admin</option>
            </FormSelect>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label>image</Form.Label>
            <Form.Control type="file"  />
          </Form.Group>
        </div>
      </div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
    </>
  )
}

export default Users