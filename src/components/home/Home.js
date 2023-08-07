import React from 'react'
import Navbar from '../navbar/Navbar'
import ProductListing from '../productListing/ProductListing'
import ProductDetail from '../productDetail/ProductDetail'

function Home() {
  return (
    <div>
      <Navbar />
      <ProductDetail />
      <ProductListing />
    </div>
  )
}

export default Home