import React from 'react'
import Navbar from '../navbar/Navbar'
import { Link, Navigate, Outlet, useLocation, useNavigation, useParams } from 'react-router-dom'

function Home() {
  const a = useLocation()
  // console.log(a);
 const params = useParams()
//  console.log(params);
  return (
    <div>
      <Link to='/category/phones'>Phones</Link>
      <Link to='/'>Home</Link>
      <Link to='/detail/abc'>ID</Link>
      <Link to='/detail/abcd'>ID</Link>
      {/* <Navigate to='/detail/navvi' replace={true}>IDnavigate</Navigate> */}
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Home