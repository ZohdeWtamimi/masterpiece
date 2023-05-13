import React, { useCallback, useEffect, useState } from 'react'
import './Slider.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SliderData } from './SliderData'


function Slider() {
  const [currentImg, setCurrnetImg] = useState(0)
  const parentDiv = {
    position: "relative",
    width:"100%",
    backgroundImage: `url(${SliderData[currentImg].url})`,
    height:"400px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const previousImg = ()=>{
    console.log(currentImg)
    const isLastSlide = currentImg === 0
    const newIndex = isLastSlide ? SliderData.length -1 : currentImg - 1;
    setCurrnetImg(newIndex);
  }
  const nextImg = useCallback(()=>{
    console.log(currentImg)
    const isLastSlide = currentImg === SliderData.length -1
    const newIndex = isLastSlide ? 0 : currentImg + 1;
    setCurrnetImg(newIndex);
  }, [currentImg])
  useEffect(()=>{
    let slideInterval;
    function auto(){
      slideInterval = setInterval(nextImg, 6000)
    }
      auto()
    return ()=> clearInterval(slideInterval)
  },[currentImg, nextImg])
  return (
    
        <div style={parentDiv}>
            <div  className='content current'>
                <h3>New Offer</h3>
                <p>Stay tuned for the largest collections and the latest prices</p>
                <a href='/shop' class="btn btn-dark w-25">shop now</a>
            </div>
            <FaArrowLeft  className='arrowLeft' onClick={previousImg} />
            <FaArrowRight className='arrowRight' onClick={nextImg}  />
        </div>
    
  )
}

export default Slider