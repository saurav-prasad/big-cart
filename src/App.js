import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/home/Home';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import db from './firebase';
import { useUserState } from './context/UserState';
import getCollectionItems from './firestoreQuery/getCollectionItems';
import getProducts from './firestoreQuery/getProducts';
import { useProductState } from './context/products/ProductState';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useRoutes } from 'react-router-dom';
import ProductListing from './components/productListing/ProductListing';
import ProductDetail from './components/productDetail/ProductDetail';

const category = ['phones', 'laptop', 'clothing', 'camera']


function App() {
  const [{ }, dispatch] = useUserState()
  const [{ products }, productDispatch] = useProductState()

  // all the products
  const fetchProducts = async () => {
    let tempo = [];
    for (const data of category) {
      const products = await getProducts(data);
      tempo = tempo.concat(products);
    }
    productDispatch({
      type: 'SET_PRODUCT',
      products: tempo
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
        userDetails: {
          name: docSnap.data().userDetails.name,
          email: docSnap.data().userDetails.email,
          photo: docSnap.data().userDetails.photo,
          uid: docSnap.data().userDetails.uid,
        },
        cart: await getCollectionItems(docSnap.data().userDetails.uid, "cart"),
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
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <ProductListing />,

        },
        {
          path: "/category/:categoryname",
          element: <ProductListing />,
        },
        {
          path: "/detail/:productid",
          element: <ProductDetail />,
        },
      ],
    },
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
