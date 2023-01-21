import React from 'react'

function Pagination({postsPerPage, totalPosts, paginate}) {
    const pageNumbers = [];
    for(let i=0; i <= Math.ceil(totalPosts / postsPerPage); i++){
        if(i !== 0) pageNumbers.push(i);
    }
  return (
    <nav>
        <ul className='pagination m-4 '>
            {pageNumbers.map(number => (
                <button key={number} onClick={()=> paginate(number)}  className='page-link'>
                    {number}
                </button>
            ))}
        </ul>
    </nav>

  )

}

export default Pagination