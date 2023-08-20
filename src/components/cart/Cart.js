import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Loader from '../loader/Loader';
import { useUserState } from '../../context/UserState';
import currencyFormatter from '../../currencyFormatter/currencyFormatter';
import './cart.css'
import { Link } from 'react-router-dom';
import CartCard from './CartCard';

export default function Cart({ setCart }) {
  const [{ userDetails, cart }] = useUserState()
  const [user] = useUserState()
  const [data, setData] = useState([])
  const [open, setOpen] = useState(true)

  let total = 0
  data?.map((product) =>
    total = total + product.price * product.qnt
  )

  useEffect(() => {
    if (userDetails) {
      console.log(cart);
      setData(cart)
    }
  }, [user, cart])

  setCart(open)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full cartMain">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 cartScroll">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <CloseRoundedIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {(userDetails && data?.length > 0) ? data ? data.map((product) => (
                              <CartCard key={product.id} product={product} setOpen={setOpen} />
                            )) : <Loader /> : <div style={{ flexDirection: 'column' }} className='flexCenter'>
                              <img style={{ objectFit: 'contain' }} alt='Empty Cart' src='https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg' />
                              <h1 style={{ fontWeight: '500', fontSize: '1.5rem' }}>Your Cart is empty</h1>
                            </div>}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{currencyFormatter(total)}</p>
                      </div>
                      <div className="mt-6" >
                        <Link
                          to={(localStorage.getItem('uid') && data?.length !== 0) && '/checkout'}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
