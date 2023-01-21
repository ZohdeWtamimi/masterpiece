import React from 'react'
import { FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa'
import { IoIosPin } from "react-icons/io";

function Footer() {
  return (
    <div className="bg-dark text-light py-5">
        <div className="container">
            <div className="row ">
                <div className="col-lg-3 col-md-6 ">
                    <h5>for your car</h5>
                    <hr style={{width: "20%"}} />
                    <p className='text-muted'>repaier car</p>
                    <p className='text-muted'>car parts</p>
                    <p className='text-muted'>automobile accessories</p>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5>start your shop</h5>
                    <hr style={{width: "20%"}} />
                    <p className='text-muted'>do you own service</p>
                    <p className='text-muted'>do have shop</p>
                    {/* <p className='text-muted'>moon</p> */}
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5>help</h5>
                    <hr style={{width: "20%"}} />
                    <p className='text-muted'>
                        help center
                    </p>
                    <p className='text-muted'>
                        Disputes & Reports
                    </p>
                </div> 
                <div className="col-lg-3 col-md-6">
                    <h5>CONTACT</h5>
                    <hr style={{width: "20%"}} />
                    <p className='text-muted'>
                        <IoIosPin />
                        <span>
                            AMMAN, JORDAN
                        </span>
                    </p>
                    <p className='text-muted'>
                        <FaPhoneAlt />
                        <span> +(06)46375</span>
                    </p>
                    <p className='text-muted'>
                        <FaRegEnvelope />
                        <span> parts@partcar.com</span>
                    </p>
                </div>
            </div>
            <p className='text-center pt-3'>Copyright © car Parts All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer