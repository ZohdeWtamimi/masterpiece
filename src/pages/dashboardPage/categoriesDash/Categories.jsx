import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchItems, insertItem } from '../../../store/DashboardSlice';

function Categories() {
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({CategoryName: ''})
  const {dashboards} = useSelector((state)=> state.dashboard)
  console.log(dashboards)
  const {section} = useParams()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchItems(section));
  }, [dispatch]);

  const handleInput = (e)=>{
    const newData = { ...newItem }
    newData[e.target.id] = e.target.value
    setNewItem(newData)
    console.log(newData)
  }
  const handleApi = (e)=>{
    e.preventDefault();
    // console.log(newItem)
    const send = {
      section,
      newItem
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
                  <input type="file" className="form-control" id="pic" />
                </div>
              </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="col-3 my-3">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://localhost:3000/images/slider1.jpg" />
          <Card.Body>
            <Card.Title className='text-center'>Card Title</Card.Title>
            
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
            <Button variant="danger">remove </Button>
            <Button style={{ display:"inline-block"}} variant="dark">Edit </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="col-3 my-3">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://localhost:3000/images/slider1.jpg" />
          <Card.Body>
            <Card.Title className='text-center'>Card Title</Card.Title>
            
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
            <Button variant="danger">remove </Button>
            <Button style={{ display:"inline-block"}} variant="dark">Edit </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="col-3 my-3">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://localhost:3000/images/slider1.jpg" />
          <Card.Body>
            <Card.Title className='text-center'>Card Title</Card.Title>
            
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
            <Button variant="danger">remove </Button>
            <Button style={{ display:"inline-block"}} variant="dark">Edit </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="col-3 my-3">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://localhost:3000/images/slider1.jpg" />
          <Card.Body>
            <Card.Title className='text-center'>Card Title</Card.Title>
            
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
            <Button variant="danger">remove </Button>
            <Button style={{ display:"inline-block"}} variant="dark">Edit </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="col-3 my-3">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://localhost:3000/images/slider1.jpg" />
          <Card.Body>
            <Card.Title className='text-center'>Card Title</Card.Title>
            
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
            <Button variant="danger">remove </Button>
            <Button style={{ display:"inline-block"}} variant="dark">Edit </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
  )
}

export default Categories