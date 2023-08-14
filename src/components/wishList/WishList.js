import React, { useEffect, useState } from 'react'
import WishListCard from '../wishListCard/WishListCard'
import getRealTimeSubcollection from '../../firestoreQuery/getRealTimeSubcolletion'
import { useUserState } from '../../context/UserState'
import Loader from '../loader/Loader'
import addToSubCollection from '../../firestoreQuery/addToSubCollection'
import deleteFromSubcollection from '../../firestoreQuery/deleteFromSubcollection'
import Alrt from '../alrt/Alrt'

function WishList() {
    const [{ userDetails, }] = useUserState()
    const [data, setdata] = useState(null)
    const [alert, setAlert] = useState(null)

    const addToCart = async (product) => {
        await addToSubCollection('users', 'cart', { ...product, qnt: 1 })
        showAlert({ status: true, text: 'Item added to cart', type: 'success' })
        deleteData(product)
    }
    const removeFromWishList = async (product) => {
        showAlert({ status: true, text: 'Item removed from WishList', type: 'success' })
        await deleteFromSubcollection('users', 'wishList', product.id)
    }
    const deleteData = async (product) => {
        showAlert({ status: true, text: 'Item moved to Cart', type: 'success' })
        await deleteFromSubcollection('users', 'wishList', product.id)
    }
    const showAlert = (data) => {
        setAlert(data)
        setTimeout(() => {
            setAlert(null);
        }, 1000)
    }

    useEffect(() => {
        async function fetchData() {
            if (userDetails) {
                const a = await getRealTimeSubcollection('users', userDetails?.uid, 'wishList')
                setdata(a)
            }
        }
        return () => fetchData()
    })

    return (
        <div className='pt-7'>
            <h1 className="text-2xl font-bold text-black ">Your Wishlist ❤️</h1>
            <div className={(userDetails && data?.length > 0) ? "mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4" : ''}>
                {(userDetails && data?.length > 0) ? data ? data.map((product) => (
                    <WishListCard addToCart={addToCart} removeFromWishList={removeFromWishList} product={product} />
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