import { useEffect, } from 'react';
import './App.css';
import Home from './components/home/Home';
import { doc, getDoc, } from 'firebase/firestore';
import db from './firebase';
import { useUserState } from './context/UserState';
import getCollectionItems from './firestoreQuery/getCollectionItems';
import getProducts from './firestoreQuery/getProducts';
import { useProductState } from './context/products/ProductState';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import ProductListing from './components/productListing/ProductListing';
import ProductDetail from './components/productDetail/ProductDetail';
import WishList from './components/wishList/WishList';
import { ErrorPage } from './components/404Page/ErrorPage';
import { Checkout } from './components/checkout/Checkout';
import { Order } from './components/order/Order';
import Profile from './components/profile/Profile';
import Catalogue from './components/catalogue/Catalogue';

const category = ['phones', 'laptop', 'clothing', 'camera']


function App() {

  const [, dispatch] = useUserState()
  const [, productDispatch] = useProductState()

  // all the products
  const fetchProducts = async () => {
    let products = [];
    for (const data of category) {
      const a = await getProducts(data);
      products = products.concat(a);
      // console.log(products);
    }
    productDispatch({
      type: 'SET_PRODUCT',
      products
    })
    // console.log(tempo);
  }

  // user data
  const getUser = async () => {
    const docRef = doc(db, "users", localStorage.getItem('uid'));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
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
  }
  useEffect(() => {
    fetchProducts()
    localStorage.getItem('uid') && getUser()
  }, [])

  // routes
  const router = createBrowserRouter([
    // user routes
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <>
          <Catalogue/>
            <ProductListing />
          </>,

        },
        {
          path: "/category/:categoryname",
          element: <ProductListing />,
        },
        {
          path: "/detail/:productid",
          element: <ProductDetail />,
        },
        {
          path: "/wishlist",
          element: <WishList />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/order",
          element: <Order />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    }

  ]);
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
