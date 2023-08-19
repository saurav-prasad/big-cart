import React, { useEffect, useState } from 'react'
import './productListing.css'
import Card from '../productListingCard/ProductListingCard'
import { useProductState } from '../../context/products/ProductState'
import Loader from '../loader/Loader'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

function ProductListing() {

    const [{ products },] = useProductState()
    const params = useParams()
    let product = products

    // filter by category 
    if (params.categoryname) {
        product = products?.filter((data) => {
            return data.category === params.categoryname
        });
    }
    else {
        product = products
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="mt-8 text-2xl  mb-10 font-medium tracking-tight text-gray-900" >{params?.categoryname?.toUpperCase()}</h2>
                {product ?
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                        {product?.map((product) => <Card key={product.key} product={product} />)}
                    </div> :
                    <Loader />
                }
            </div>
        </div>
    )
}

export default ProductListing