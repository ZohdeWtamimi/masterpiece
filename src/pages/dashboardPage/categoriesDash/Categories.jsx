import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteItem, fetchItems, insertItem } from '../../../store/DashboardSlice';

function Categories() {
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    CategoryName: '',
    image: ''
  })
  const {dashboards} = useSelector((state)=> state.dashboard)
  console.log(dashboards)
  const {section} = useParams()
  const dispatch = useDispatch()

// console.log(section)
  useEffect(() => {
    dispatch(fetchItems(section));
  }, [dispatch]);
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
  const handleInput = (e)=>{
    const newData = { ...newItem }
    newData[e.target.id] = e.target.value
    setNewItem(newData)
    console.log(newData)
  }
  const handleApi = (e)=>{
    e.preventDefault();
    const formData = new FormData()
    formData.append('CategoryName', newItem.CategoryName)
    formData.append('image', newItem.image)
    console.log(formData.get('CategoryName'))
    // console.log(formData.get('image'))
    
    console.log(newItem)
    const send = {
      section,
      formData
    }
    console.log(send)
    dispatch( insertItem(send) ).unwrap()
    .then((res) => {
      console.log(res);
    });
  }
  return (
    <div>
    <div className="row" >
      <div className='d-flex justify-content-between align-items-center ' style={{background: "#36454F"}}>
        <h2 style={{color: "#fff"}}>categories list</h2>
        <button onClick={()=> setShowForm(!showForm)} style={{background: "transparent", color:'#fff', borderColor: "#fff", borderRadius: "5px"}}>Add Category</button>
      </div>
      <div className='bg-light shadow' style={{transition: "ease-in .5s", height: showForm ? "200px" : "0", paddingTop: showForm ? "20px" : "0", paddingBottom: showForm ? "20px" : "0"}}>
        <form onSubmit={(e)=> handleApi(e)} style={{width: "80%", margin: "0 auto", display: showForm ? "block" : "none"}}>
          <div className="row">
              <div className="col">
              <div className="mb-3">
                <label forhtml="exampleInputEmail1" className="form-label">Category Name</label>
                <input onChange={(e)=> handleInput(e)} type="text" className="form-control" id="CategoryName" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              </div>
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
      {Array.isArray(dashboards.data) && dashboards?.data?.map((e, i)=>(
        <div key={i} className="col-3 my-3">
        <Card style={{ width: '18rem' }}>
        {e.url ? <Card.Img variant="top" style={{height:"150px"}} src={`http://127.0.0.1:8000/images/${e.url}`} /> : <Card.Img variant="top" src="http://localhost:3000/images/slider1.jpg" /> } 
          {/* <Card.Img variant="top" src="http://localhost:3000/images/slider1.jpg" /> */}
          <Card.Body>
            <Card.Title className='text-center'>{e?.CategoryName}</Card.Title> 
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text>
              products ({e.products?.length})
            </Card.Text>

            <div className="d-flex justify-content-between align-items-center">
            <Button variant="danger" onClick={ev => onDelete(e)}>remove </Button>
            <Link className='btn btn-dark' to={'/dashboard/categories/'+e.id}>edit</Link>
            {/* <Button style={{ display:"inline-block"}} variant="dark">Edit </Button> */}
            </div>
          </Card.Body>
        </Card>
      </div>
      ))}
      
      
     
      
    </div>
  </div>
  )
}

export default Categories