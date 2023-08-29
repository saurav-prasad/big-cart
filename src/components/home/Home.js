import React from 'react'
import Navbar from '../navbar/Navbar'
import { Link, Navigate, Outlet, useLocation, useNavigation, useParams } from 'react-router-dom'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'
import Test from '../Test'
import WishList from '../wishList/WishList'
import Profile from '../profile/Profile'
import { collection, getDocs } from 'firebase/firestore'
import db from '../../firebase'

function Home() {
  const a = async (e) => {
    e.preventDefault()
    // const productsRef = collection(db, "products");
    // const querySnapshot = await getDocs(productsRef);
    // console.log(querySnapshot.docs);
    const querySnapshot = await getDocs(collection(db, "items"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    // const subcollectionRef = collection(db, "products", "mvTeqV2UR9hxOqzz39hhAPww2aj2", "laptop");
    // const subcollectionSnapshot = await getDocs(subcollectionRef);
    // subcollectionSnapshot.forEach((doc) => {
    //   console.log({ ...doc.data(), productId: doc.id });
    // });
  }
  return (
    <div>
      <button onClick={a}>Get doc</button>
      <Navbar />
      <Breadcrumbs />
      <Outlet />
    </div>
  )
}

export default Home