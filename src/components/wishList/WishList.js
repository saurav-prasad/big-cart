import React, { useEffect, useState } from 'react'
import WishListCard from '../wishListCard/WishListCard'
import getRealTimeSubcollection from '../../firestoreQuery/getRealTimeSubcolletion'
import { useUserState } from '../../context/UserState'
import Loader from '../loader/Loader'
import addToSubCollection from '../../firestoreQuery/addToSubCollection'
import deleteFromSubcollection from '../../firestoreQuery/deleteFromSubcollection'
import Alrt from '../alrt/Alrt'
import { useWishListState } from '../../context/wishList/WishListState'
import { useCartState } from '../../context/cart/CartState'

function WishList() {
    const [{ userDetails, wishList }] = useUserState()
    const [data, setdata] = useState([])
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        setdata(wishList)
        console.log(wishList);
    }, [wishList])

    const showAlert = (data) => {
        setAlert(data)
        setTimeout(() => {
            setAlert(null);
        }, 1000)
    }
    return (
        <div className='pt-7'>
            <h1 className="text-2xl font-bold text-black ">Your Wishlist ❤️</h1>
            <div className={(userDetails && data?.length > 0) ? "mx-auto grid w-full max-w-7xl  space-y-4 px-2 py-10 md:grid-cols-2 items-end md:gap-6 md:space-y-0 lg:grid-cols-4" : ''}>
                {(userDetails && data?.length > 0) ? data ? data?.map((product) => (
                    <WishListCard showAlert={showAlert} product={product} />
                )) : <Loader /> : <div style={{ flexDirection: 'column' }} className='flexCenter mt-12'>
                    <img style={{ objectFit: 'contain', width: '20em' }} alt='Empty Cart' src='https://img.freepik.com/premium-vector/heart-with-plus-positive-sign-wishlist-charity-element_598264-338.jpg' />
                    <h1 className='mt-5' style={{ fontWeight: '500', fontSize: '1.5rem' }}>Your Wishlist is empty</h1>
                </div>}
            </div>
            <Alrt showAlert={alert?.status} text={alert?.text} type={alert?.type} />
        </div>
    )
}

export default WishList