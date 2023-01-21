import React from 'react'
import { Link } from 'react-router-dom'

function Products({ posts, loading, images}) {
    if(loading){
        return <h2>loading...</h2>
    }
    console.log(posts)
  return (
    <div className="row ">
            {posts.map((post, i) =>(
            <div key={i} className="col-lg-3 col-md-6 p-2 ">
                <div className="container p-2 shadow bg-light">
                <img style={{width:"100%", height: "150px"}} alt="" />
                <p>{post.title.substring(0,12)}...<Link to={`/shop/${post.id}`}>see more</Link> </p>
                <p>price: $500 <del>$700</del></p>
                <button className='btn btn-primary'>add to cart</button>
                </div>
              </div>
            ))}  
    </div>
    
  )
}

export default Products