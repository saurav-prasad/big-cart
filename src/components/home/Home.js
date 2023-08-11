import React from 'react'
import Navbar from '../navbar/Navbar'
import { Link, Navigate, Outlet, useLocation, useNavigation, useParams } from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'
import Test from '../Test'

function Home() {
  return (
    <div>
      <Navbar />
      <Breadcrumbs />
      {/* <Test /> */}
      <Outlet />
    </div>
  )
}

export default Home