import React from 'react'
import { useProductState } from '../../context/products/ProductState'
import sliceString from '../../sliceString/sliceString'

function Test() {
  const [{ products }] = useProductState()
  console.log(products);
  return (
    <div className='rounded-lg shadow-2xl overflow-x-auto p-5 my-8 bg-white'>
      {/* header */}
      <div className='w-full'>
        <h1 className='text-left font-medium text-3xl mb-1'>Your Inventory</h1>
        <p className='text-left text-sm'>Overview of your products</p>
      </div>
      {/* table */}
      <div className="flex flex-col justify-center items-middle mt-10 divide-y divide-gray-100">
        {/* table heading */}
        <div className='flex py-4 px-2 flex-row justify-between items-center align-middle'>
          <span className='font-medium mr-4 text-left w-32'>Product-ID</span>
          <span className='font-medium mr-4 text-center w-16'>Image</span>
          <span className='font-medium mr-4 text-center w-32'>Name</span>
          <span className='font-medium mr-4 text-center w-32'>Description</span>
          <span className='font-medium mr-4 text-center w-28'>Tags</span>
          <span className='font-medium mr-4 text-left w-20'>Orig. Price</span>
          <span className='font-medium text-left w-20'>Sale Price</span>
        </div>
        {/* table products list */}
        {
          products?.map((data) =>
            <div className='flex py-4 px-2 flex-row justify-between items-center align-middle'>
              <span className='font-normal truncate text-sm mr-4 text-left  text-gray-700 w-32'>#{data.productId}</span>
              <img
                alt='Products'
                src={data.imageSrc}
                className="inline-block w-16 object-contain rounded-lg mr-4"
              />
              <span className='font-normal text-sm mr-4  text-gray-700 w-32'>{sliceString(data.name, 50)}</span>
              <span className='font-normal text-sm mr-4 text-gray-700 w-32'>{sliceString(data?.description, 50)}</span>
              <span className='font-normal text-sm mr-4 text-gray-700 w-32'>{sliceString(data.tags, 50)}</span>
              <span className='font-normal text-sm mr-4 text-gray-700 text-left w-20'>₹2592</span>
              <span className='font-normal text-sm text-gray-700 text-left w-20'>₹{data.price}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Test