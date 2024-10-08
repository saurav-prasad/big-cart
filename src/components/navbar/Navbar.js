import React, { Fragment, useEffect, useState } from 'react'
import './navbar.css'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Cart from '../cart/Cart';
import googleLogin from '../../login';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../../firebase';
import { useUserState } from '../../context/UserState';
import getCollectionItems from '../../firestoreQuery/getCollectionItems';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sliceString from '../../sliceString/sliceString';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { FavoriteRounded } from '@mui/icons-material';
import { Menu, Transition } from '@headlessui/react'

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
        try {

          const docRef = doc(db, "users", userInfo.uid);
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            console.log(docSnap.data());
            const docData = docSnap.data().userDetails;
            dispatch({
              type: 'SET_USER',
              userDetails: {
                name: userInfo.displayName,
                email: userInfo.email,
                photo: userInfo.photo,
                uid: userInfo.uid,
                phoneNumber: docSnap.data().userDetails.phoneNumber,
              },
              adderss: docSnap?.data()?.address,
              cart: await getCollectionItems(docData.uid, "cart")
            })
            localStorage.setItem('uid', docData.uid)

          }
          else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            await setDoc(doc(db, "users", userInfo.uid), {
              userDetails: {
                name: userInfo.displayName,
                email: userInfo.email,
                photo: userInfo.photo,
                uid: userInfo.uid,
              }
            });
            dispatch({
              type: 'SET_USER',
              userDetails: {
                name: userInfo.displayName,
                email: userInfo.email,
                photo: userInfo.photo,
                uid: userInfo.uid,
              },
              cart: await getCollectionItems(userInfo.uid, "cart")
            })
            localStorage.setItem('uid', userInfo.uid)
          }

        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchData();
  }, [userInfo])


  const userName = userDetails?.name

  // user data
  const getTestUser = async () => {
    
    try {

      const docRef = doc(db, "users", "tWvcMP4vebyvflbekbF0");
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
      if (docSnap.exists()) {
        // localStorage.setItem('uid', docSnap.data().uid)
        dispatch({
          type: "SET_USER",
          userDetails: docSnap.data().userDetails,
          cart: await getCollectionItems(docSnap.data().userDetails.uid, "cart"),
          wishList: await getCollectionItems(docSnap.data().userDetails.uid, "wishList"),
        })
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <nav className='navbar flexCenter' >
        {/* Navbar Left */}
        <div className='flexCenter navbarLeft'>


          <MenuRoundedIcon onClick={() => setNav(true)} className='navbarBurger' />
          {location.pathname.startsWith('/detail/') ?
            <KeyboardBackspaceRoundedIcon fontSize='large' className='cursorPointer navbarArrow text-bold' onClick={() => navigate(-1)} /> :
            <h1 className='navTitle'><Link to='/'>Big-Cart</Link></h1>}
          <ul className='flexCenter navLists'>
            {category.map((data, i) => <li key={i} className='navList cursorPointer rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition'><Link to={data.href}>{data.name}</Link></li>)}
          </ul>



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
                      <Link
                        to='/profile'
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        onClick={logOutUser}
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Sign out
                      </span>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu> :
            <div className='flexCenter'>
              {/* <button className='cursorPointer flexCenter rounded-lg text-white bg-gray-700 hover:bg-gray-900 hover:text-white navbarUser transition' onClick={loginUser}>
                Test user
              </button> */}
              <button onClick={getTestUser} className="cursorPointer flexCenter rounded-lg text-white bg-gray-700 hover:bg-gray-900 hover:text-white navbarUser transition">Test user</button>
              <span className='cursorPointer ml-2 flexCenter rounded-lg text-white bg-gray-700 hover:bg-gray-900 hover:text-white navbarUser transition' onClick={loginUser}>
                Sign In
              </span>
            </div>
          }
          <span className='cursorPointer navbarOrder rounded-lg transition text-gray-200 hover:bg-gray-700 hover:text-white '>
            <Link to='/order'>Orders</Link>
          </span>
          <ul style={{ margin: '0' }} className='flexCenter navLists'>
            <li style={{ margin: '0' }} className='navList cursorPointer'>
              <Link to='/wishlist'>
                <FavoriteRounded fontSize='medium' className='rounded-lg transition text-red-600 hover:bg-gray-700 hover:text-red-500  ' />
              </Link>
            </li>
          </ul>
          <ShoppingCartRoundedIcon onClick={() => setCart(true)} className='ml-2 transition rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white  cursorPointer navbarCart' />
        </div>
        {/* Sidebar */}
        <div
          style={{
            transform: `${Nav ? 'translateX(0%)' : 'translateX(-100%)'}`
          }}
          className='navbarSidebar'>
          <CloseRoundedIcon className='navbarClose' onClick={() => setNav(false)} />
          <ul>
            <li><strong>👇Top Categories</strong></li>
            {
              category.map((data, i) => <li key={i} onClick={() => setNav(false)} ><Link to={data.href}><p>{data.name}</p></Link></li>)
            }
            <li onClick={() => setNav(false)}><p><strong><Link to='/wishlist'>❤️ WishList</Link></strong></p></li>
            <li onClick={() => setNav(false)}><p><strong><Link to='/order'>🔖 My Orders</Link></strong></p></li>
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
