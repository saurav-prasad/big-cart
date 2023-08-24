import React from 'react'
import './sellerNavbar.css'
import { Link } from 'react-router-dom'


function SellerNavbar({menuItems}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className=''>
        <div className='absolute hidden shadow-lg bg-white h-screen w-fit py-5 px-4'>
          <h1 className="font-bold text-xl mb-8 text-left pl-4">Big-Cart / Seller</h1>
          <ul>
            {menuItems.map((data) =>
              <Link to={data.href}>
                <li className='flex justify-start items-center cursor-pointer pl-4 my-1 py-4 pr-20 hover:bg-gray-50 ease-in rounded-sm'>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 mr-4 object-contain">{data.logo}</svg>
                  <p className='text-gray-700 antialiased font-normal'>{data.name}</p>

                </li>
              </Link>
            )}

          </ul>
        </div>
        <div className='bg-blue-600 flex justify-end py-2 px-3'>
          <img
            className="inline-block h-10 w-10 rounded-full"
            src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
            alt="Dan_Abromov"
          />
        </div>
      </nav>
    </>
  )
}

export default SellerNavbar