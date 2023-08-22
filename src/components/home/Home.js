import React from 'react'
import Navbar from '../navbar/Navbar'
import { Link, Navigate, Outlet, useLocation, useNavigation, useParams } from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'
import Test from '../Test'
import WishList from '../wishList/WishList'
import Profile from '../profile/Profile'

function Home() {
  return (
    <div>
      <Navbar />
      <Breadcrumbs />
      <Outlet />
    </div>
  )
}

export default Home