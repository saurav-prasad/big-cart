import { LogoDevRounded } from '@mui/icons-material'
import React from 'react'

function WishListCard({ product }) {
    return (
        <div className="rounded-md border">
            <img
                src="https://m.media-amazon.com/images/I/61Ph34V0YAL._SX679_.jpg"
                alt="Laptop"
                className=" object-contain max-h-96 w-full rounded-md  md:h-[300px] lg:h-[200px]"
            />
            <LogoDevRounded/>
            <div className="p-4">
                <h1 className="inline-flex items-center text-lg font-semibold">Nike Airmax v2</h1>
                <p className="mt-3 text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
                </p>
                <div className="mt-4">
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                        #Sneakers
                    </span>
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                        #Nike
                    </span>
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                        #Airmax
                    </span>
                </div>
                <button
                    type="button"
                    className="mt-4 w-full rounded-sm bg-black px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default WishListCard