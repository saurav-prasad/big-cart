import React, { useEffect, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useUserState } from '../../context/UserState';
import currencyFormatter from '../../currencyFormatter/currencyFormatter';
import deleteFromSubcollection from '../../firestoreQuery/deleteFromSubcollection';
import { useNavigate } from 'react-router-dom';
import Alrt from '../alrt/Alrt';
import sliceString from '../../sliceString/sliceString';
import axios from 'axios';
import addToSubCollection from '../../firestoreQuery/addToSubCollection';
import { serverTimestamp } from 'firebase/firestore';
import getCollectionItems from '../../firestoreQuery/getCollectionItems';
import { useCartState } from '../../context/cart/CartState';

export function Checkout() {
    const [address, setAdderess] = useState({ address: "", city: "", name: "", phoneNumber: "", pin: "", state: "" })
    const navigate = useNavigate()
    const { deleteCartItem } = useCartState()
    const [user, dispatch] = useUserState()
    const [products, setProducts] = useState([])

    const handleOnChange = (e) => {
        setAdderess({
            ...address,
            [e.target.id]: e.target.value
        })
    }

    const handleCheckout = async (amount) => {
        const { data: { key } } = await axios.get('https://razorpayapi.vercel.app/api/getkey')
        const { data } = await axios.post('https://razorpayapi.vercel.app/api/checkout', {
            amount: amount
        })
        const options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Big Cart",
            description: "Big Cart order payment",
            image: "https://effectiv.ai/wp-content/uploads/2023/03/BigCart-Logo.svg",
            order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // callback_url: "https://razorpayapi.vercel.app/api/verifypayment",
            handler: async function () {
                let orderDetails = {
                    "orderId": `#${data.id.slice(6)}`,
                    "orderStatus": "Confirmed",
                    "total": amount,
                    "date": serverTimestamp()
                }
                await addToSubCollection("orders", "order", { orderDetails, products: products, address })
                await addToSubCollection("users", "orders", { orderDetails, products: products, address })
                for (const iterator of user.cart) {
                    console.log("iterator1", iterator);
                    await deleteFromSubcollection("users", "cart", iterator.id)
                }
                navigate('/order')
                dispatch({
                    ...user,
                    cart: []
                })
            },
            theme: {
                color: "#3399cc"
            }
        }
        const rzp1 = window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
    }

    const [{ userDetails }] = useUserState()
    const [alert, setAlert] = useState()
    let totalPrice = 0
    products?.map((product) =>
        totalPrice = totalPrice + product.price * product.qnt
    )
    useEffect(() => {
        if (userDetails) {
            setProducts(user?.cart)
            user?.cart?.length === 0 && navigate("/")
        }
    }, [user.cart])

    const showAlert = (data) => {
        setAlert(data)
        setTimeout(() => {
            setAlert(null);
        }, 800)
    }
    return (
        <div className="mx-auto my-4 max-w-4xl md:my-6">
            <div className="overflow-hidden  rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Contact Info */}
                    <div className="px-5 py-6 text-gray-900 md:px-8">
                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-200">
                                <div className="py-6">
                                    <form>
                                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                                            <div>
                                                <h3
                                                    id="contact-info-heading"
                                                    className="text-lg font-semibold text-gray-900"
                                                >
                                                    Contact information
                                                </h3>
                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <input
                                                        onChange={handleOnChange}
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        id="name"
                                                    ></input>
                                                </div>

                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="phoneNumber"
                                                    >
                                                        Contact number
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="number"
                                                        placeholder="Enter your contact number"
                                                        id="phoneNumber"
                                                        onChange={handleOnChange}
                                                    ></input>
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

                                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Address
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                name="address"
                                                                autoComplete="street-address"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                onChange={handleOnChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="city"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            City
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="city"
                                                                name="city"
                                                                autoComplete="address-level2"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                onChange={handleOnChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="state"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            State
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="state"
                                                                name="region"
                                                                autoComplete="address-level1"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                onChange={handleOnChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="pin"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Pin code
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="number"
                                                                id="pin"
                                                                name="postal-code"
                                                                autoComplete="postal-code"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                onChange={handleOnChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10 flex justify-between align-middle border-t border-gray-200 pt-6">
                                                <ul className="flex justify-between align-middle space-y-3">
                                                    <li className="flex items-center justify-between text-gray-900">
                                                        <p className="text-sm font-medium ">Total</p>
                                                        <p className="text-sm font-bold ml-1">₹{currencyFormatter(totalPrice)}</p>
                                                    </li>
                                                </ul>
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                    onClick={() => handleCheckout(totalPrice)}
                                                >
                                                    Make payment
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Product List */}
                    <div className="bg-gray-100 px-5 py-6 md:px-8">
                        <div className="flow-root">
                            <ul className="-my-7 divide-y divide-gray-200">
                                {products?.map((product) => (
                                    <li
                                        key={product.id}
                                        className="flex items-stretch justify-between space-x-5 py-7"
                                    >
                                        <div className="flex flex-1 items-stretch">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                                                    src={product.imageSrc}
                                                    alt={product.name}
                                                />
                                            </div>
                                            <div className="ml-5 flex flex-col justify-start">
                                                <div className="flex-1">
                                                    <p className="text-sm text-left font-bold">{sliceString(product.name, 50)}</p>
                                                </div>
                                                <p className=" text-left mt-1 text-xs flex-1 font-medium ">Qnt:{product.qnt}</p>
                                            </div>
                                        </div>
                                        <div className="ml-auto flex flex-col items-end justify-between">
                                            <p className="text-right text-sm font-bold text-gray-900">₹{currencyFormatter(product.price * product.qnt)}</p>
                                            <button
                                                onClick={(e) => { e.preventDefault(); (products?.length === 1) ? showAlert({ status: true, text: 'Atleast one item required', type: 'error' }) : deleteCartItem(product) }}
                                                type="button"
                                                className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                            >
                                                <span className="sr-only">Remove</span>
                                                <CloseRoundedIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <hr className="mt-6 border-gray-200" />
                        <ul className="mt-6 space-y-3">
                            <li className="flex items-center justify-between text-gray-900">
                                <p className="text-sm font-medium ">Total</p>
                                <p className="text-sm font-bold ">₹{currencyFormatter(totalPrice)}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Alrt showAlert={alert?.status} text={alert?.text} type={alert?.type} />

        </div>
    )
}
