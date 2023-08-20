import React from 'react'
import currencyFormatter from '../../../currencyFormatter/currencyFormatter';
import sliceString from '../../../sliceString/sliceString';

function OrderCard({ products, address, orderDetails }) {
    // console.log(products, orderDetails);
    const a = new Date(orderDetails?.date.seconds * 1000)
    return (
        <div className="mb-14 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
            <div className="w-full border-r px-3  border-gray-300 bg-gray-100 md:max-w-xs">
                <div className="p-8 pb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                        <div className="mb-4">
                            <div className="text-sm font-semibold">Order Id</div>
                            <div className="text-sm font-medium text-gray-700">{orderDetails?.orderId}</div>
                        </div>
                        <div className="mb-4">
                            <div className="text-sm font-semibold">Date</div>
                            <div className="text-sm font-medium text-gray-700">{a?.toDateString()} {a?.toLocaleTimeString()}</div>
                        </div>
                        <div className="mb-4">
                            <div className="text-sm font-semibold">Total Amount</div>
                            <div className="text-sm font-medium text-gray-700">₹{currencyFormatter(orderDetails?.total)}</div>
                        </div>
                        <div className="mb-4">
                            <div className="text-sm font-semibold">Order status</div>
                            <div className="text-sm font-medium text-gray-700">{orderDetails?.orderStatus}</div>
                        </div>
                    </div>
                </div>
                <hr className="mb-8" />
                {/* Contact Info */}
                <div className="px-5 pb-6 bg-gray-100 md:px-8">
                    <div className="flow-root">
                        <div className="-my-6 divide-y divide-gray-200">
                            <div className="py-6">
                                <h2 className="mb-2 text-base font-bold text-black">Shipping Information</h2>
                                <p className="mt-3 text-xs font-medium text-gray-700">{address?.name}</p>
                                <p className="text-xs font-medium text-gray-700">{address?.state},{address?.city}</p>
                                <p className="text-xs font-medium text-gray-700">{address?.address},{address?.pin}</p>
                                <p className="text-xs font-medium text-gray-700">{address?.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <div className="p-8">
                    <ul className="-my-7 divide-y divide-gray-200">
                        {products?.map((product) => (
                            <li
                                key={product.id}
                                className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                            >
                                <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                            src={product.imageSrc}
                                            alt={product.imageSrc}
                                        />
                                    </div>

                                    <div className="ml-5 flex w-full flex-col justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm text-left font-bold text-gray-900">{sliceString(product.name, 100)}</p>
                                        </div>

                                        <p className="mt-4 text-sm text-left font-medium text-gray-500">Qnt: {product.qnt}</p>
                                    </div>
                                </div>

                                <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">₹{currencyFormatter(product.price * product.qnt)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OrderCard