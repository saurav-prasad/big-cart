import { FavoriteRounded, LogoDevRounded } from '@mui/icons-material'
import React, { memo, useState } from 'react'
import './wishListCard.css'
import { useNavigate } from 'react-router-dom'
import sliceString from '../../sliceString/sliceString'
import addToSubCollection from '../../firestoreQuery/addToSubCollection'
import deleteFromSubcollection from '../../firestoreQuery/deleteFromSubcollection'
import Alrt from '../alrt/Alrt'
import { useUserState } from '../../context/UserState'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
function WishListCard({ product, removeFromWishList, addToCart }) {
    const navigate = useNavigate()
    return (
        <div className="rounded-md border relative">
            <img
                src={product.imageSrc}
                alt={product.name}
                className="object-contain h-72 w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
            />
            <FavoriteTwoToneIcon onClick={() => removeFromWishList(product)} fontSize='medium' className='absolute right-2 top-2 text-red-600 cursor-pointer' />
            <div className="p-4">
                <h1  onClick={() => { navigate(`/detail/${product.productId}`) }}  className="inline-flex items-center text-lg font-semibold">{sliceString(product.name, 20)}</h1>
                <p  onClick={() => { navigate(`/detail/${product.productId}`) }}  className="mt-3 text-sm text-gray-600">
                    {sliceString(product.description, 50)}
                </p>
                <button
                    type="button"
                    className="mt-4 w-full rounded-sm bg-black px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={(e) => { addToCart(product); e.preventDefault() }}
                >
                    Move to Cart
                </button>
            </div>
            <Alrt showAlert={alert?.status} text={alert?.text} type={alert?.type} />
        </div>
    )
}

export default memo(WishListCard)