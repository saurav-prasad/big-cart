import React from 'react'
import Navbar from '../navbar/Navbar'
import { Link, Navigate, Outlet, useLocation, useNavigation, useParams } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Home