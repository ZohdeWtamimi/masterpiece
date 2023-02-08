import React, { useEffect, useState } from 'react'
import { Button, Form, FormSelect } from 'react-bootstrap'
import { FaUserPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { deleteItem, fetchItems, insertItem } from '../../../store/DashboardSlice';
import './users.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Users() {
  const [showForm, setShowForm] = useState(false) 
  const [newItem, setNewItem] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    mobile: '',
    // address: '',
    role: 'user',
  })
  const dispatch = useDispatch()
  let {section} = useParams()
  // users
  const {dashboards} = useSelector((state) => state.dashboard)
//  console.log(dashboards)
//  console.log(dashboards.meta.links)
  // fetch users
  useEffect(() => {
    dispatch(fetchItems(section));
  }, [dispatch,section]);
  // console.log(dashboards, loading)

  // section = 'users?page=4'
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
  // console.log(imagedata)
  const onDelete = (e)=>{
    if(!window.confirm('Are you sure you want to delete this user?')){
      return   
    }
    dispatch( deleteItem({section, newItem:{id:e.id} })).unwrap().then(e =>{
      toast.error('User Deleted Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
    dispatch(fetchItems(section));
  }
  const handlePaginate = (e)=>{
    if(e.active) return;
    // console.log(e)
    if(e.label.length === 1){
      let indexStart = e.url.indexOf('?');
      let addtion = e.url.slice(indexStart)
      section = `users${addtion}`;
    }
    if(e.label ==='&laquo; Previous'){
      // let cu
      if(dashboards.meta.current_page === 1) return;
      let prevPage = dashboards.meta.current_page - 1
      section = `users?page=${prevPage}`;
    }
    if(e.label ==="Next &raquo;"){
      // let cu
      if(dashboards.meta.current_page === dashboards.meta.last_page) return;
      let nextPage = dashboards.meta.current_page + 1
      section = `users?page=${nextPage}`;
    }
    dispatch(fetchItems(section));
  }
 
  ////////// START - CREATE USER -
  // send data to api
  const handleApi = (e)=>{
    e.preventDefault();
    const formData = new FormData()
    formData.append('image', newItem.image)
    formData.append('name', newItem.name)
    formData.append('email', newItem.email)
    formData.append('password', newItem.password)
    formData.append('mobile', newItem.mobile)
    formData.append('role', newItem.role)
    console.log(formData.get('image'))
    console.log(formData.get('name'))
    console.log(formData.get('email'))
    console.log(formData.get('password'))
    console.log(formData.get('mobile'))
    console.log(formData.get('role'))
    // let hello = formData
    // console.log(hello.get('name'))
    // setNewItem({...newItem, image:imagedata})
    setShowForm(false)
    const send = {
      section,
      formData
    }
    console.log(send)
    dispatch( insertItem(send) ).unwrap()
    .then((res) => {
      toast.success('User Created Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log(res);
    }).catch(error =>{
      console.log(error)
    });
    dispatch(fetchItems(section));
  }
  //////// END - CREATE USER -
  // console.log("hello" + null)
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <div className='over'>
    <div className='p-2 d-flex justify-content-between align-items-center' style={{backgroundColor:"#36454F"}}>
       <h2 style={{color: "#fff", fontSize: "1.3rem",  fontWeight: "bold" }}>User List</h2>  
        <button onClick={()=> setShowForm(!showForm)} className='addBtn' style={{border: "1px solid #EDF1F8"}}><FaUserPlus /> Add User</button>
    </div>
    <div className="container p-4  shadow pt-2 disappear" style={{transform: showForm ? "translateX(1500px)": 'translateX(0px)', transition: "all .5s"}}>
     <div className='paginate'>
        <div className='paginateNum'>
        {dashboards?.meta?.links && dashboards.meta.links.map(e =>(
          <button className={e.active ? 'activePaginate paginateBtn' : 'paginateBtn'} onClick={()=> handlePaginate(e)} key={e.label} >{e.label === '&laquo; Previous' ? "prev" : e.label === "Next &raquo;" ? "next" : e.label}</button>
          ))}
        </div>
        <div className='paginateInfo'>showing form {dashboards.meta?.from} to {dashboards.meta?.to} of {dashboards.meta?.total}</div>
     </div>
      {/* user table */}
      <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">image</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">created_at</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
    <tbody>
    {dashboards.data && dashboards.data.map((e, i) =>(
        <tr key={e.id}>
        <th scope="row">{dashboards.meta.from + i}</th>
        {/* http://127.0.0.1:8000/images/register.jpeg */}
        {e.url ? <td><img style={{width:"50px"}} src={`http://127.0.0.1:8000/images/${e.url}`} alt="" /></td> : <td>there's no image</td> } 
        <td>{e.name}</td>
        <td>{e.email}</td>
        <td>{e.created_at}</td>
        <td>
          <Link className='btn btn-dark' to={'/dashboard/users/'+e.id}>edit</Link>
          {/* <button >edit</button>  */}
          &nbsp;
          <button onClick={ev => onDelete(e)}  className='btn btn-danger'>delete</button>
        </td>
      </tr>
      ))}
      </tbody>
      </table>
    </div>
    <div className='appear container' style={{zIndex:showForm ? "1" : "-1", top:"10%", position: "absolute", transition:showForm? "ease-in .3s": "", width: "100%"}}>
    <Form onSubmit={(e)=> handleApi(e)} className='' encType='multipart/form-data' >
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" >
            <Form.Label> Name</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="name" value={newItem.name} type="text" placeholder="ex: john" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </div>
        <div className="col">
          {/* <Form.Group className="mb-3" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="lastName" value={newItem.lastName} type="text" placeholder="ex: doe" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group> */}
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
          {/* <Form.Group className="mb-3" >
            <Form.Label>Address</Form.Label>
            <Form.Control onChange={(e)=> handleInput(e)} id="address" value={newItem.address} type="text" placeholder="ex: New York" />

          </Form.Group> */}
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
            <Form.Control onChange={handleImage} type="file" name='image' id='image' />
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