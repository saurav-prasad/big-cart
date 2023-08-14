import React, { useEffect, useState } from 'react'
import getCollectionItems from '../../firestoreQuery/getCollectionItems'
import OrderCard from './orderCard/OrderCard'


export const Order = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        async function fetchData() {
            const a = await getCollectionItems(localStorage.getItem('uid'), 'orders')
            setdata(a)
        }
        fetchData()
    }, [])

    return (
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            <h2 className="text-3xl font-bold">Order Details</h2>
            <div className="mt-5 mb-2 text-sm">
                Check the status of recent and old orders & discover more products
            </div>
            {data?.map((arr) => <OrderCard orderDetails={arr.orderDetail} address={arr.address} products={arr.products} />
            )}
        </div>
    )
}
