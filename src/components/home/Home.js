import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet,} from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'

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