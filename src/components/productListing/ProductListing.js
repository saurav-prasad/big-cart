import React, { useEffect, useState } from 'react'
import './productListing.css'
import Card from '../productListingCard/ProductListingCard'
import { useProductState } from '../../context/products/ProductState'
import { useParams } from 'react-router-dom'
import Skeletonn from '../skeleton/Skeleton'

function ProductListing() {

    const [{ products },] = useProductState()
    const params = useParams()
    const [product, setProduct] = useState()
    // let product = products
    // filter by category 
    useEffect(() => {
        filterProducts(products)
    }, [products, params.categoryname])


    const filterProducts = (data) => {
        if (params.categoryname) {
            const filteredData = data?.filter((data) => {
                return data.category === params.categoryname
            })
            setProduct(filteredData)
            return filteredData
        }
        else {
            setProduct(data)
            return data
        }
    }

    const [selectedValue, setSelectedValue] = useState(false);

    const handleRadioChange = (event) => {
        const value = event.target.value
        setSelectedValue(value);
        if (value === 'right') {
            setProduct(product.sort((a, b) => b.price - a.price))
        }
        else if (value === 'left') {
            setProduct(product.sort((a, b) => a.price - b.price))
        }
        else {
            filterProducts(products)
        }
    };
    const [preValue, setPreValue] = useState(0)

    const filterByWords = (value) => {
        const filterValue = value.toLowerCase()
        setSelectedValue(false)
        if (filterValue.length >= 1 && filterValue.length > preValue) {
            setProduct(
                product?.filter((e) => {
                    const a = e.name.toLowerCase()
                    const b = e.description.toLowerCase()
                    return a.includes(filterValue) || b.includes(filterValue)
                })
            )
            setPreValue(filterValue.length)
        }
        else if (filterValue.length < preValue) {
            const newData = filterProducts(products)
            newData && setProduct(newData?.filter((e) => {
                const a = e.name.toLowerCase()
                const b = e.description.toLowerCase()
                return a.includes(filterValue) || b.includes(filterValue)
            }))
            setPreValue(filterValue.length)
        }
        else if (filterValue.length === 0) {
            filterProducts(products)
        }

    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="mt-8 text-3xl  mb-12 font-bold tracking-tight text-gray-900"  >{params?.categoryname?.toUpperCase()}</h2>
                <h2 className="mt-8 text-3xl  mb-12 font-bold tracking-tight text-gray-900" >
                    {!params.categoryname && "🌟Our Top Products🌟"}</h2>
                <div className='flex justify-between productlistingFilters mb-4'>
                    <div className='flex mb-7'>
                        <span className='mr-2'>Sort by price :</span>
                        <label className='mr-4 cursor-pointer'>
                            <input
                                className='mr-2 cursor-pointer text-2xl'
                                type="radio"
                                value="left"
                                checked={selectedValue === 'left'}
                                onChange={handleRadioChange}
                            />
                            Low to High
                        </label>
                        <label className='cursor-pointer'>
                            <input
                                className='mr-2 cursor-pointer text-2xl'
                                type="radio"
                                value="right"
                                checked={selectedValue === 'right'}
                                onChange={handleRadioChange}
                            />
                            High to Low
                        </label>
                    </div>
                    <input
                        className="productlistingFiltersWordFilter flex h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder='🔎 Search products here...'
                        onChange={(e) => filterByWords(e.target.value)} type="text" />
                </div>
                {product ?

                    <>
                        {
                            product.length === 0 ?
                                <img className='mx-auto object-contain max-w-sm' src='https://www.sterisonline.com//assets/img/No_Product_Found.png' alt='Product not found!' /> :
                                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                                    {product?.map((product) => <Card key={product.key} product={product} />)}
                                </div>
                        }
                    </>
                    :
                    // <Loader />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                        {Array.from({ length: 20 }).map((_) =>
                            <Skeletonn />
                        )}

                    </div>
                }
            </div>
        </div>
    )
}

export default ProductListing