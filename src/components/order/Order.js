import React, { useEffect, useState } from 'react'
import getCollectionItems from '../../firestoreQuery/getCollectionItems'
import OrderCard from './orderCard/OrderCard'
import { useUserState } from '../../context/UserState'


export const Order = () => {
    const [data, setdata] = useState([])
    const [user,] = useUserState()
    const [{ userDetails }, dispatch] = useUserState()

    useEffect(() => {
        async function fetchData() {
            if (user.userDetails) {
                const a = await getCollectionItems(userDetails.uid, 'orders')
                a?.sort((item1, item2) => item2.orderDetails.date.seconds - item1.orderDetails.date.seconds)
                setdata(a)
            }
        }
        fetchData()
    }, [user])

    return (
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            <h2 className="text-3xl font-bold">Order Details</h2>
            <div className="mt-5 mb-8 text-sm">
                Check the status of recent and old orders & discover more products
            </div>
            {data?.length === 0 ?
                <div className='flexCenter flex-col'>
                    <h1 className='mb-10 font-medium text-3xl'>No orders yet.</h1>
                    <img alt='no-orders' className='object-contain' src='https://mir-s3-cdn-cf.behance.net/projects/404/8412d0104101523.Y3JvcCwxMDI0LDgwMCwwLDcw.jpg' />
                </div> :
                data?.map((arr) => <OrderCard orderDetails={arr?.orderDetails} address={arr?.address} products={arr?.products} />
                )}
        </div>
    )
}
