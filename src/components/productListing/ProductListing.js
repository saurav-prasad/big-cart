import React, { useEffect, useState } from 'react'
import './productListing.css'
import Card from '../card/Card'
import { useProductState } from '../../context/products/ProductState'
import Loader from '../loader/Loader'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
function ProductListing() {

    const [{ products },] = useProductState()
    // const [product, setProduct] = useState({})
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
    console.log(product);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                <h2 className="text-3xl mb-12 font-bold tracking-tight text-gray-900" >Our Products</h2>
                {product ?
                    <div className=" mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                        {product?.map((product) => <Card key={product.key} product={product} />)}
                    </div> :
                    <Loader />
                }

            </div>
        </div>
    )
}

export default ProductListing