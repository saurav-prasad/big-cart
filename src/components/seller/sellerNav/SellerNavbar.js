import React, { Fragment, useState } from 'react'
import './sellerNavbar.css'
import { Link, } from 'react-router-dom'
import { useSellerState } from '../sellerContext/SellerState'
import sliceString from '../../../sliceString/sliceString'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function SellerNavbar({ menuItems }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [{ sellerDetails }] = useSellerState()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className=''>
        <div
          style={{
            transform: `${isMenuOpen ? 'translateX(0%)' : 'translateX(-100%)'}`,
            transition: 'transform 300ms ease'
          }}
          className=' fixed xl:hidden shadow-2xl bg-white h-screen w-fit py-6 px-4 z-10'>
          <h1 className="font-bold text-xl mb-12 text-left pl-4">Big-Cart / Seller</h1>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 object-contain absolute top-6 right-3"
            onClick={toggleMenu}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

          <ul>
            {menuItems.map((data) =>
              <Link to={data.href} onClick={toggleMenu}>
                <li className='flex justify-start items-center cursor-pointer pl-4 my-1 py-4 pr-24 hover:bg-gray-50 ease-in rounded-sm'>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 mr-4 object-contain">{data.logo}</svg>
                  <p className='text-gray-700 antialiased font-normal'>{data.name}</p>

                </li>
              </Link>
            )}

          </ul>
        </div>
        <div className='bg-blue-600 flex xl:justify-end justify-between items-center p-3 '>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 object-contain text-white xl:hidden"
            onClick={toggleMenu}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
          <div className='absolute'>
            <Menu >
              <Menu.Button>More</Menu.Button>
              <Menu.Items>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      href="/account-settings"
                    >
                      Account settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      href="/account-settings"
                    >
                      Documentation
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item disabled>
                  <span className="opacity-75">Invite a friend (coming soon!)</span>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
          {sellerDetails ?
            // Profile dropdown
            <Menu>
              <Menu.Button>More</Menu.Button>
              <Menu.Items>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      href="/account-settings"
                    >
                      Account settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      href="/account-settings"
                    >
                      Documentation
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item disabled>
                  <span className="opacity-75">Invite a friend (coming soon!)</span>
                </Menu.Item>
              </Menu.Items>
            </Menu>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block h-8 w-8 p-1 rounded-full ring-2 ring-white bg-white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block h-8 w-8 p-1 rounded-full ring-2 ring-white bg-white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg> */}
        </div>
      </nav>
    </>
  )
}

export default SellerNavbar