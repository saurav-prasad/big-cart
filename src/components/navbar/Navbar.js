import React, { useState } from 'react'
import './navbar.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { styled } from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function Navbar() {
  const [Nav, setNav] = useState(false)
  const category = ['Home', 'Watches', 'Phones', 'Shirts']
  return (
    <>
      <nav className='navbar flexCenter' >
        {/* Navbar Left */}
        <div className='flexCenter navbarLeft'>

          <MenuRoundedIcon onClick={() => setNav(true)} className='navbarBurger' />

          <h1 className='navTitle'>Big-Cart</h1>
          <ul className='flexCenter navLists'>
            {category.map(data => <li className='navList cursorPointer'><a>{data}</a></li>)}
          </ul>
        </div>
        {/* Navbar Right */}
        <div className='navbarRight flexCenter'>
          <span className='cursorPointer navbarUser'>User</span>
          <span className='cursorPointer navbarOrder'>Orders</span>
          <ShoppingCartOutlinedIcon className='cursorPointer navbarCart' />
        </div>
        {/* Sidebar */}

        <div
          style={{
            transform: `${Nav ? 'translateX(0%)' : 'translateX(-100%)'}`
          }}
          className='navbarSidebar flexCenter'>
            <CloseRoundedIcon className='navbarClose' onClick={() => setNav(false)} />
            <ul>
              <li><strong>Top Categories</strong></li>
              {
                category.map(data => <li><p>{data}</p></li>)
              }
              <li><p><strong>My Orders</strong></p></li>
            </ul>
        </div>

      </nav>

    </>
  )
}

export default Navbar
