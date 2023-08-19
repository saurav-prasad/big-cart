import React, { Fragment, useEffect, useState } from 'react'
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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import sliceString from '../../sliceString/sliceString';
import getRealTimeSubcollection from '../../firestoreQuery/getRealTimeSubcolletion';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { FavoriteBorderRounded, FavoriteRounded } from '@mui/icons-material';
import { Disclosure, Menu, Transition } from '@headlessui/react'

const category = [
  {
    name: 'Home',
    href: '/'

  },
  {
    name: 'Phone',
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function Navbar() {
  const [{ userDetails }, dispatch] = useUserState()
  const [Nav, setNav] = useState(false)
  const [cart, setCart] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [cartLength, setcartLength] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
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


  const userName = userDetails?.name
  return (
    <>
      <nav className='navbar flexCenter' >
        {/* Navbar Left */}
        <div className='flexCenter navbarLeft'>
          {location.pathname.startsWith('/detail/') ? <KeyboardBackspaceRoundedIcon fontSize='large' className='cursorPointer text-bold' onClick={() => navigate(-1)} /> :
            <>
              <MenuRoundedIcon onClick={() => setNav(true)} className='navbarBurger' />

              <h1 className='navTitle'><Link to='/'>Big-Cart</Link></h1>
              <ul className='flexCenter navLists'>
                {category.map(data => <li className='navList cursorPointer'><Link to={data.href}>{data.name}</Link></li>)}
              </ul>

            </>
          }
        </div>
        {/* Navbar Right */}
        <div className='navbarRight flexCenter'>

          {userDetails ?
            // Profile dropdown
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userDetails?.photo}
                    alt=""
                  />
                  <span className='cursorPointer flexCenter text-white navbarUser'>
                    {sliceString(userName, 8)}
                  </span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={logOutUser}
                        href="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu> :
            <span className='cursorPointer flexCenter text-white bg-slate-300 navbarUser' onClick={loginUser}>
              Sign In
            </span>
          }
          <span className='cursorPointer navbarOrder'><Link to='/order'>Orders</Link></span>
          <ul style={{ margin: '0' }} className='flexCenter navLists'>
            <li style={{ margin: '0' }} className='navList cursorPointer'><Link to='/wishlist'><FavoriteRounded fontSize='medium' className='text-red-500' /></Link></li>
          </ul>
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
              category.map(data => <li onClick={() => setNav(false)} ><Link to={data.href}><p>{data.name}</p></Link></li>)
            }
            <li onClick={() => setNav(false)}><p><strong><Link to='/wishlist'>WishList</Link></strong></p></li>
            <li onClick={() => setNav(false)}><p><strong><Link to='/order'>My Orders</Link></strong></p></li>
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
