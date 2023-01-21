import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, insertProduct } from '../../../store/ProductSlice';
import { deleteItem, fetchItems, insertItem } from '../../../store/DashboardSlice';

function Products({isOpen}) {
  const [showForm, setShowForm] = useState(false)
  const {section} = useParams()
  // const {  products, error } = useSelector((state) => state.product);
  const {dashboards} = useSelector((state) => state.dashboard)
  const [newItem, setNewItem] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productDiscount: ''
  })
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems(section));
  }, [dispatch]);
  console.log(dashboards)
  // useEffect(() => {
  //   dispatch(fetchProducts(section));
  // }, [dispatch]);
  // console.log(products)
  const handleInput = (e)=>{
    const newData = { ...newItem }
    newData[e.target.id] = e.target.value
    setNewItem(newData)
    // console.log(newData)
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
      <div className="row">
        {/* hey zohde note: to delete you should use this line of code */}
        {/* <button onClick={()=> dispatch( deleteItem({section, newItem:{id:11} }) ) }>send</button> */}
      <div className='d-flex justify-content-between align-items-center ' style={{background: "#36454F"}}>
        <h2 style={{color: "#fff"}}>Products list</h2>
        <button onClick={()=> setShowForm(!showForm)} style={{background: "transparent", color:'#fff', borderColor: "#fff", borderRadius: "5px"}}>Add Product</button>
      </div>
      <div className='bg-light shadow' style={{transition: "ease-in .5s", height: showForm ? "420px" : "0", paddingTop: showForm ? "20px" : "0", paddingBottom: showForm ? "20px" : "0"}}>
        <form onSubmit={(e)=> handleApi(e)} style={{width: "80%", margin: "0 auto", display: showForm ? "block" : "none"}}>
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
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col">
                <div className="mb-3">
                  <input onChange={(e)=> handleInput(e)} value={newItem.productDescription} type="text" className="form-control" id="productDescription" placeholder="Product description" />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col">
                <div className="mb-3">
                  <input onChange={(e)=> handleInput(e)} value={newItem.productDiscount} type="number" className="form-control" id="productDiscount" placeholder="Product discount" />
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
              <div className="d-flex justify-content-between">
              <div className="d-flex">
                <p style={{ fontWeight: "700"}}>$342</p>
                <del className="text-muted" style={{marginLeft: "13px", fontWeight: "500"}}>$245</del>
              </div>
              <p className='bg-warning px-2 py-0 fw-bold text-light'>sale</p>
              </div>
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
              <div className="d-flex justify-content-between">
              <div className="d-flex">
                <p style={{ fontWeight: "700"}}>$342</p>
                <del className="text-muted" style={{marginLeft: "13px", fontWeight: "500"}}>$245</del>
              </div>
              <p className='bg-warning px-2 py-0 fw-bold text-light'>sale</p>
              </div>
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
              <div className="d-flex justify-content-between">
              <div className="d-flex">
                <p style={{ fontWeight: "700"}}>$342</p>
                <del className="text-muted" style={{marginLeft: "13px", fontWeight: "500"}}>$245</del>
              </div>
              <p className='bg-warning px-2 py-0 fw-bold text-light'>sale</p>
              </div>
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
              <div className="d-flex justify-content-between">
              <div className="d-flex">
                <p style={{ fontWeight: "700"}}>$342</p>
                <del className="text-muted" style={{marginLeft: "13px", fontWeight: "500"}}>$245</del>
              </div>
              <p className='bg-warning px-2 py-0 fw-bold text-light'>sale</p>
              </div>
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
              <div className="d-flex justify-content-between">
              <div className="d-flex">
                <p style={{ fontWeight: "700"}}>$342</p>
                <del className="text-muted" style={{marginLeft: "13px", fontWeight: "500"}}>$245</del>
              </div>
              <p className='bg-warning px-2 py-0 fw-bold text-light'>sale</p>
              </div>
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

export default Products