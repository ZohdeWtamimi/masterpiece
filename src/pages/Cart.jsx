import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { removeItem } from '../store/CartSlice'
import './cart.css'

function Cart() {
    const dispatch = useDispatch()
    const {cartItems, amount, total} = useSelector((state) => state.cart)
    console.log(total)

    if(amount < 1){
        return (
           <>
            <Header />
        <h1>there's no products</h1>
           </>
        )
    }

  return (
    <div>
        <Header />
        <div className="container mt-5 p-3 rounded cart">
        <div className="row no-gutters">
            <div className="col-md-12">
                <div className="product-details mr-2">
                    <div className="d-flex flex-row align-items-center">
                        <i className="fa fa-long-arrow-left"></i>
                        <span className="ms-2">Continue Shopping</span>
                    </div>
                    <hr />
                    <h6 className="mb-0">Shopping cart</h6>
                    <div className="d-flex justify-content-between">
                        <span>You have {amount} items in your cart</span>
                        <div className="d-flex flex-row align-items-center"><span className="text-black-50">total: </span>
                            <div className="price ml-2">
                                <span className="mr-1">JD {total}</span>
                                <i className="fa fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    {cartItems.map(e =>(
                        <div key={e.id} className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                        <div className="d-flex flex-row">
                            <img className="rounded" src={`http://127.0.0.1:8000/images/${e.url}`} width="100" height="100" />
                            <div className="ms-4" >
                                <span className="font-weight-bold d-block">{e.productName}</span>
                                <span className="spec">{e.productDescription}</span>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <span className="d-block me-5">{e.quantity}</span>
                            <span className="d-block m-3 font-weight-bold">${e.productPrice}</span>
                            <FaTrashAlt onClick={()=> dispatch(removeItem(e))} />
                        </div>
                    </div>
                    ))}
                   
                    
                    
                </div>
            </div> 
        </div>
    </div>
    </div>
  )
}

export default Cart