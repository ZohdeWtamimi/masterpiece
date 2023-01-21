import React from 'react'
import Categories from '../components/categories/Categories'
import Footer from '../components/footer/Footer'
import Header from '../components/Header'
import Slider from '../components/Slider'


function Home() {
  return (
      <>
      <Header />
      <Slider />
      <Categories />
      <Footer />
      </>
    )
}

export default Home