import './productDetail.css'
import { useProductState } from '../../context/products/ProductState';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import currencyFormatter from '../../currencyFormatter/currencyFormatter';
import sliceString from '../../sliceString/sliceString';
import Alrt from '../alrt/Alrt';
import { FavoriteRounded } from '@mui/icons-material';
import { useCartState } from '../../context/cart/CartState';
import { useWishListState } from '../../context/wishList/WishListState';
import { useUserState } from '../../context/UserState';
import { serverTimestamp } from 'firebase/firestore';


export default function ProductDetail() {
    const [text, settext] = useState(false)
    const [alert, setAlert] = useState(null)
    const [{ products },] = useProductState()
    const { addWish } = useWishListState()
    const { addCart } = useCartState()
    const [product, setProduct] = useState({})
    const [qnt, setQnt] = useState(1)
    const params = useParams()
    const [{ userDetails }] = useUserState()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Adds smooth scrolling animation
        })
        const filteredProducts = products?.filter((data) => {
            return data.productId === params.productid;
        });

        if (filteredProducts && filteredProducts.length > 0) {
            setProduct(filteredProducts[0]);
        } else {
            setProduct({});
        }
    }, [products, params.productid])

    const addToWishList = () => {
        userDetails?.uid ? addToWish() : showAlert({ status: true, text: 'Sign-in first', type: 'error' })
    }
    const addToCart = (e) => {
        e.preventDefault()
        userDetails?.uid ? getData() : showAlert({ status: true, text: 'Sign-in first', type: 'error' })
    }
    const addToWish = () => {
        addWish({ ...product, date: serverTimestamp() })
        showAlert({ status: true, text: 'Item added to WishList', type: 'success' })
    }
    const getData = () => {
        addCart({ ...product, qnt })
        setQnt(1)
        showAlert({ status: true, text: 'Item added to Cart', type: 'success' })
    }
    const showAlert = (data) => {
        setAlert(data)
        setTimeout(() => {
            setAlert(null);
        }, 800)
    }
    return (
        <>
            {products ?
                <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
                    <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
                        <div className="col-span-5 grid  grid-cols-1 ">
                            <div className="col-span-1 h-4/5 transition duration-150 ease-in hover:opacity-90">
                                <img
                                    src={product?.imageSrc}
                                    alt={product?.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        {/* </div> */}
                        <div className="col-span-4 pt-8 lg:pt-0">
                            <div className=" border-b border-gray-300 text-left pb-7">
                                <h2 className="text-heading mb-3.5 text-xl font-medium md:text-xl lg:text-2xl 2xl:text-3xl" onClick={() => text ? settext(false) : settext(true)}>
                                    {text ? product.name : sliceString(product.name, 40)} <small
                                        style={{ display: `${product?.name?.length > 40 ? 'inline-block' : 'none'}` }}
                                        className='text-sm font-normal'>{text ? 'Read less' : 'Read more'}</small>

                                </h2>
                                <div className="mt-5 flex items-center justify-between">
                                    <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                                        ₹{currencyFormatter(product?.price)}
                                        <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                                            {product?.discountPrice && `₹${currencyFormatter(product?.discountPrice)}`}
                                        </span>
                                    </div>
                                    <FavoriteRounded onClick={addToWishList} className='cardWish cursor-pointer' />
                                </div>
                            </div>
                            <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-0 lg:pr-0 2xl:pr-0">
                                <div className="mr-2 group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                                    <button onClick={() => { qnt > 1 && setQnt(qnt - 1) }}
                                        className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"

                                    >
                                        -
                                    </button>
                                    <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                                        {qnt}
                                    </span>
                                    <button onClick={() => { setQnt(qnt + 1) }} className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12">
                                        +
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    onClick={addToCart}
                                >
                                    Add to cart
                                </button>
                                <Alrt showAlert={alert?.status} text={alert?.text} type={alert?.type} />

                            </div>
                            <div className="py-6 ">
                                <ul className="space-y-5 pb-1 text-sm">
                                    <li>
                                        <span className="text-heading inline-block pr-2 font-semibold">Category:</span>
                                        <span className="hover:text-heading transition hover:underline" >
                                            {product.category}
                                        </span>
                                    </li>
                                    <li className="productTags">
                                        <span className="text-heading inline-block pr-2 font-semibold">Tags:</span>
                                        <span
                                            className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                                        >
                                            {product.tags && product?.tags}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="shadow-sm ">
                                <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                                    <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                        Product Details
                                    </h2>
                                    <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                                        <div className="bg-heading h-0.5 w-full rounded-sm" />
                                        <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                                    </div>
                                </header>
                                <div>
                                    <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                                        {product.description ? product.description : 'Details not provided.'}
                                    </div>
                                </div>
                                <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                                    <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                        Why you choose us?
                                    </h2>
                                    <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                                        <div className="bg-heading h-0.5 w-full rounded-sm" />
                                        <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                                    </div>
                                </header>
                                <div>
                                    <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                                        Our Customer Experience Team is available 7 days a week and we offer 2 ways to get
                                        in contact.Email and Chat . We try to reply quickly, so you need not to wait too
                                        long for a response!.
                                    </div>
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