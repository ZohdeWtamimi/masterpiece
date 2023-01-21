import React from 'react'
import { CategoryData } from './CategoryData'
import "./categories.css";


function Categories() {
  return (
    <div className='container my-5'>
        <h2 className='fs-1 fw-bold'>Shop Smart, Step by Step</h2>
        <p>Let <span className='fs-3 fw-bold'>Brandname</span> Help You Shop Like A Pro</p>
        <div className="row mt-4" style={{}}>
            {CategoryData.map((e,i)=>{
                return <div key={i} className="col-lg-3 col-md-6 col-sm-10 shadowbox" style={{ height:"auto", maxHeight: "300px", paddingTop:".5%"}}> 
                    <h3 ><div className='text-light fs-4 rounded-circle' style={{display: "inline-block" , width: "40px", height:"40px", textAlign:"center", lineHeight:"40px", backgroundColor:"#333"}}>{i + 1}</div> {e.title}</h3>
                    <p className='text-secondary'>{e.desc}</p>
                    <img style={{width:"100%", height: "40%"}} src={e.url} alt="" />
                    <button className='d-block mt-2 fw-bold' style={{width: "100%", backgroundColor: "transparent", border:"#333 3px solid", borderRadius:"4px", padding:"2%", color:"#333"}}>get started</button>
                </div>
            })} 
        </div>
    </div>
  )
}

export default Categories