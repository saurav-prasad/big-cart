import React, { useEffect, useState } from 'react'
import './navbar.css'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Cart from '../cart/Cart';
import googleLogin from '../../login';
import { doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useUserState } from '../../context/UserState';
import getCollectionItems from '../../firestoreQuery/getCollectionItems';
import { Link } from 'react-router-dom';

const category = [
  {
    name: 'Home',
  },
  {
    name: 'phone',
    href: '/category/phones'
  },
  {
    name: 'Camera',
    href: '/category/camera'
  },
  {
    name: 'Clothing',
    href: '/category/clothing'
  },
  {
    name: 'Laptop',
    href: '/category/laptop'
  },
]
function Navbar() {
  const [{ userDetails }, dispatch] = useUserState()
  const [Nav, setNav] = useState(false)
  const [cart, setCart] = useState(false)
  const [userInfo, setUserInfo] = useState()

  const loginUser = async () => {
    // Example usage
    (async () => {
      try {
        const userDetail = await googleLogin();
        setUserInfo(userDetail)
      } catch (error) {
        console.error('Login error:', error);
        console.log(error)
      }
    })();
  }
  const logOutUser = () => {
    dispatch({
      type: 'UNSET_USER'
    })
    localStorage.clear()
    setUserInfo()
  }
  // userInfo details upload query
  useEffect(() => {
    async function fetchData() {
      if (userInfo) {
        await setDoc(doc(db, "users", userInfo.uid), {
          userDetails: {
            name: userInfo.displayName,
            email: userInfo.email,
            photo: userInfo.photoURL,
            uid: userInfo.uid,
          }
        });
        localStorage.setItem('uid', userInfo.uid)
        dispatch({
          type: 'SET_USER',
          userDetails: {
            name: userInfo.displayName,
            email: userInfo.email,
            photo: userInfo.photoURL,
            uid: userInfo.uid,
          },
          cart: await getCollectionItems(userInfo.uid, "cart")
        })
      }
    }
    fetchData();
  }, [userInfo])

  // category.map((data) => {
  //   console.log(data);
  // })
  return (
    <>
      <nav className='navbar flexCenter' >
        {/* Navbar Left */}
        <div className='flexCenter navbarLeft'>

          <MenuRoundedIcon onClick={() => setNav(true)} className='navbarBurger' />

          <h1 className='navTitle'>Big-Cart</h1>
          <ul className='flexCenter navLists'>
            {category.map(data => <li className='navList cursorPointer'><Link to={data.href}>{data.name}</Link></li>)}
          </ul>
        </div>
        {/* Navbar Right */}
        <div className='navbarRight flexCenter'>

          {userDetails ?
            <span className='cursorPointer flexCenter text-white navbarUser'>
              {userDetails.name}
              <LogoutRoundedIcon onClick={logOutUser} style={{ marginLeft: '5px' }} />
            </span> :
            <span className='cursorPointer flexCenter text-white navbarUser' onClick={loginUser}>
              Sign In
            </span>
          }

          <span className='cursorPointer navbarOrder'>Orders</span>
          <ShoppingCartRoundedIcon onClick={() => setCart(true)} className='ml-2 cursorPointer navbarCart' />
        </div>
        {/* Sidebar */}
        <div
          style={{
            transform: `${Nav ? 'translateX(0%)' : 'translateX(-100%)'}`
          }}
          className='navbarSidebar'>
          <CloseRoundedIcon className='navbarClose' onClick={() => setNav(false)} />
          <ul>
            <li><strong>Top Categories</strong></li>
            {
              category.map(data => <li><p>{data.name}</p></li>)
            }
            <li><p><strong>My Orders</strong></p></li>
          </ul>
        </div>
        <div
          style={{
            display: `${Nav ? 'block' : 'none'}`
          }}
          className='navbarSidebarBackground'
          onClick={() => setNav(false)} />
      </nav>
      {cart && <Cart setCart={setCart} />}
    </>
  )
}

export default Navbar
