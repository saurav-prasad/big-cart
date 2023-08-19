import React, { useEffect, useState } from 'react'
import sliceString from '../../sliceString/sliceString';
import { useCartState } from '../../context/cart/CartState';
import { useNavigate } from 'react-router-dom';
import currencyFormatter from '../../currencyFormatter/currencyFormatter';

function CartCard({ product, setOpen }) {

    const { deleteCartItem, updateCart } = useCartState()
    const navigate = useNavigate()
    const [qnt, setQnt] = useState(1)
    useEffect(() => {
        setQnt(product.qnt)
    }, [])
    const updateQnt = (type) => {
        switch (type) {
            case "increment":
                setQnt(qnt + 1)
                updateCart(product, qnt + 1)
                break
            case "decrement":
                qnt >= 2 && setQnt(qnt - 1)
                qnt >= 2 && updateCart(product, qnt - 1)
                break
            default: return 0
        }
    }
    return (
        product &&
        <li key={product.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full cursor-pointer object-contain object-center"
                    onClick={() => { navigate(`/detail/${product.productId}`); setOpen(false) }}
                />
            </div>

            <div className="ml-4 flex align-middle justify-between flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href={product.href}>{sliceString(product.name, 50)}</a>
                        </h3>
                        <p className="ml-4">₹{currencyFormatter(product.price * qnt)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="flex flex-1 items-middle justify-between text-sm">
                    <div className='flex flex-1 items-center justify-start'>
                        <p className="text-gray-500">Qty</p>
                        <div className="ml-2 group flex h-6 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 ">
                            <button onClick={() => updateQnt("decrement")}
                                className="text-heading hover:bg-heading flex h-full w-5 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none "

                            >
                                -
                            </button>
                            <span className="duration-250 text-heading flex h-full w-6  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out ">
                                {qnt}
                            </span>
                            <button onClick={() => updateQnt("increment")} className="text-heading hover:bg-heading flex h-full w-5 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none ">
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => { e.preventDefault(); deleteCartItem(product) }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartCard