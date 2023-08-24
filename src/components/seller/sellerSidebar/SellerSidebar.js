import React from 'react'
import { Link } from 'react-router-dom'

function SellerSidebar({menuItems}) {
    return (
        <div className=' h-fit w-fit py-5 px-4'>
            <h1 className="font-bold text-xl mb-8 text-left pl-4">Big-Cart / Seller</h1>
            <ul>
                {menuItems.map((data) =>
                    <Link to={data.href}>
                        <li className='flex justify-start items-center cursor-pointer pl-4 my-1 py-4 pr-20 hover:bg-gray-50 ease-in rounded-sm'>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 mr-4 object-contain">{data.logo}</svg>
                            <p className='text-gray-700 antialiased font-normal'>{data.name}</p>

                        </li>
                    </Link>
                )}

            </ul>
        </div>
    )
}

export default SellerSidebar