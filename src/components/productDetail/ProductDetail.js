import FavoriteIcon from '@mui/icons-material/Favorite';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import './productDetail.css'
import { useProductState } from '../../context/products/ProductState';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import currencyFormatter from '../../currencyFormatter/currencyFormatter';


export default function ProductDetail() {
    const [{ products },] = useProductState()
    const [product, setProduct] = useState({})
    const params = useParams()

    useEffect(() => {
        const a = products?.filter((data) => {
            return data.productId === params.productid
        })
        setProduct(a[0])
        console.log(a[0]);
    }, [])

    return (
        <>
            {product ?
                <div className="bg-white">
                    <div className="pt-6">


                        {/* Product info */}
                        <div className="pt-5 justify-center lg:flex">

                            {/* Image gallery */}
                            <div className="mx-auto mt-6 flex-4 max-w-2xl sm:px-6 lg:inline-block lg:max-w-7xl lg:grid-cols-3 ">
                                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                                    <img
                                        src={product?.imageSrc}
                                        alt={product?.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 m-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7  lg:gap-x-8 lg:pl-0 lg:pb-24 lg:pt-16">

                                {/* Options */}
                                <div className="mt-4 lg:row-span-3 lg:mt-0">
                                    <div className="lg:col-span-2 justify-between align-middle flex pr-3  lg:pr-8">
                                        <h1 className="text-2xl mb-3 text-left font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.name}</h1>
                                        <FavoriteIcon className='cardWish cursorPointer' />
                                    </div>
                                    <div className="lg:col-span-2 justify-between align-middle flex pr-3  lg:pr-8">
                                        <p className="text-3xl tracking-tight text-left text-gray-900">₹{currencyFormatter(product?.price)}</p>
                                        {/* Quantity */}
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            <span
                                                className="cursorPointer relative inline-flex items-center rounded-l-md px-1 py-1 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                            >
                                                <span className="sr-only">Previous</span>
                                                <RemoveRoundedIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                            <span
                                                href="#"
                                                aria-current="page"
                                                className="relative z-10 inline-flex items-center  px-4 py-2 text-lg font-semibold  text-gray-400  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                1
                                            </span>

                                            <span
                                                href="#"
                                                className="cursorPointer relative inline-flex items-center rounded-r-md px-1 py-1 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                            >
                                                <span className="sr-only">Next</span>
                                                <AddRoundedIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        </nav>
                                    </div>

                                    <form className="mt-10 ">
                                        <button
                                            type="submit"
                                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Add to Cart
                                        </button>

                                        <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pb-16 lg:pr-8 lg:pt-6">
                                            {/* Description and details */}
                                            <div>
                                                <h3 className="sr-only">Description</h3>

                                                {/* <div className="space-y-6">
                                            <p className="text-base text-gray-900">{product.description}</p>
                                        </div> */}
                                            </div>

                                            <div className="mt-10">
                                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                                {/* <div className="mt-4">
                                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                                {product.highlights.map((highlight) => (
                                                    <li key={highlight} className="text-gray-400">
                                                        <span className="text-gray-600">{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div> */}
                                            </div>

                                            <div className="mt-10">
                                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                                {/* <div className="mt-4 space-y-6">
                                            <p className="text-sm text-gray-600">{product.details}</p>
                                        </div> */}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Loader />
            }
        </>
    )
}