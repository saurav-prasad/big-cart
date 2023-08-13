import React from 'react'
import WishListCard from '../wishListCard/WishListCard'

function WishList() {
    return (
        <div className='pt-7'>
            <h1 className="text-2xl font-bold text-black ">Your Wishlist ❤️</h1>
            <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <WishListCard />
                ))}
            </div>
        </div>
    )
}

export default WishList