import { ArrowRightAltRounded } from '@mui/icons-material'
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import googleLogin from '../../../login';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../../../firebase';
import { useSellerState } from '../sellerContext/SellerState';
import { useNavigate } from 'react-router-dom';

export function SellerSignup() {

    const [cred, setCred] = useState({ email: "", password: "" })
    const [cred1, setCred1] = useState({ email: "", password: "", phoneNumber: null, name: "" })
    const [createAccount, setCreateAccount] = useState(false)
    const [check, setCheck] = useState(false)
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const navigate = useNavigate()
    const [, dispatch] = useSellerState()

    const handleSignup = async (userDetail) => {
        try {
            const docRef = doc(db, "seller", userDetail.uid);
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(userDetail);
                const docData = docSnap.data();
                dispatch({
                    type: 'SET_SELLER',
                    sellerDetails: docData,
                })
                navigate('/seller')
            }
            else {
                // docSnap.data() will be undefined in this case
                console.log(userDetail);
                await setDoc(doc(db, "seller", userDetail.uid), {
                    name: userDetail.displayName,
                    email: userDetail.email,
                    photo: userDetail.photoURL,
                    uid: userDetail.uid,
                });

                dispatch({
                    type: 'SET_SELLER',
                    sellerDetails: {
                        name: userDetail.displayName,
                        email: userDetail.email,
                        photo: userDetail.photoURL,
                        uid: userDetail.uid,
                        phoneNumber: userDetail?.uid,
                    },
                })
                navigate('/seller')
            }
        } catch (error) {
            console.error('Login error:', error);
            console.log(error)
        }
    }


    const handleCreateAccount = async (e) => {
        e.preventDefault()
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, cred1.email, cred1.password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user);
                console.log({
                    name: cred1.name,
                    email: user.email,
                    uid: user.uid,
                    phoneNumber: cred1.phoneNumber
                });
                await setDoc(doc(db, "seller", user.uid), {
                    // sellerDetails: {
                    name: cred1.name,
                    email: cred1.email,
                    uid: user.uid,
                    phoneNumber: cred1.phoneNumber
                    // }
                });
                dispatch({
                    type: 'SET_SELLER',
                    sellerDetails: {
                        name: cred1.name,
                        email: user.email,
                        uid: user.uid,
                        phoneNumber: cred1.phoneNumber
                    },
                })
                setCreateAccount(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setCheck2("Email already in use")
                console.log(errorMessage);
                console.log(errorCode);
                // console.log(error);
                // ..
            });

    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const auth = getAuth();
        signInWithEmailAndPassword(auth, cred.email, cred.password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user);

                dispatch({
                    type: 'SET_SELLER',
                    sellerDetails: {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                        uid: user.uid,
                    },
                })
                navigate('/seller')
            })
            .catch((error) => {
                setCheck(!check)
            });

    }
    const onChange1 = (e) => {
        setCred1({
            ...cred1,
            [e.target.name]: e.target.value
        })
        setCheck2(false)
    }
    const onChange = (e) => {
        setCred({
            ...cred,
            [e.target.name]: e.target.value
        })
        setCheck(false)
        setCheck1(false)
    }

    const onReset = (e) => {
        e.preventDefault()
        const auth = getAuth();
        sendPasswordResetEmail(auth, cred.email)
            .then((e) => {
                // Password reset email sent!
                console.log(e);
                setCheck1("Check your email for password reset")
                // ..
            })
            .catch((error) => {
                setCheck1("Enter a valid email")
                // ..
            });

    }

    const sellerGoogle = async (e) => {
        e.preventDefault()
        try {
            const userDetail = await googleLogin();
            // setSellerInfo(userDetail)

            if (userDetail) {
                handleSignup(userDetail)
            }
        } catch (error) {
            console.error('Login error:', error);
            console.log(error)
        }
    }

    return (
        <section>
            <div className=" flex items-center justify-center bg-white py-20 px-10 rounded-sm">
                <div className="w-96">
                    <div className="mb-2 flex justify-center">
                        <h1
                            className='font-serif font-medium text-3xl text-gray-900 mb-6'
                        >
                            Big-Cart / Seller
                        </h1>
                    </div>
                    <h2 className="text-center text-2xl font-normal leading-tight text-gray-900/50">
                        Sign in to your account
                    </h2>
                    <p onClick={() => setCreateAccount(!createAccount)} className="mt-2 text-center text-sm text-gray-600 ">
                        {createAccount ? "Have an account?" : `Don't have an account?`}{' '}
                        <p
                            className="inline font-semibold text-black transition-all duration-200 hover:underline"
                        >
                            {createAccount ? "login to your account" : "Create a free account"}
                        </p>
                    </p>
                    {createAccount ?
                        // create new Account
                        <form onSubmit={handleCreateAccount} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={cred1.name}
                                            onChange={onChange1}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={cred1.email}
                                            onChange={onChange1}
                                        ></input>
                                        {check2 && <p className='transition-all text-left mt-1 text-red-600 text-xs'>{check2}</p>}

                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Phone Number{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="number"
                                            placeholder="Phone number"
                                            name="phoneNumber"
                                            value={cred1.phoneNumber}
                                            onChange={onChange1}
                                        ></input>
                                    </div>
                                </div>
                                <div>

                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Password{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            minLength={6}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={cred1.password}
                                            onChange={onChange1}
                                        ></input>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Get started <ArrowRightAltRounded className="ml-2" size={16} />
                                    </button>
                                </div>

                            </div>
                        </form>
                        :
                        // login to existing account
                        <form onSubmit={handleSubmit} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={cred.email}
                                            onChange={onChange}
                                        ></input>
                                        {check1 && <p className='transition-all text-left mt-1 text-red-600 text-xs'>{check1}</p>}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <p onClick={onReset} className="text-sm font-semibold text-black hover:underline">
                                            {' '}
                                            Forgot password?{' '}
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={cred.password}
                                            onChange={onChange}
                                        ></input>
                                    </div>
                                    {check && <p className='transition-all text-left mt-1 text-red-600 text-xs'>Either email or password is incorrect</p>}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Get started <ArrowRightAltRounded className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    }
                    <div className='mt-4'>
                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-md bg-blue-200 px-1.5 py-1 font-semibold leading-7 text-gray-800 focus:bg-blue-100 focus:text-black hover:bg-blue-100 hover:text-black transition-all"
                        >
                            Continue with test account <ArrowRightAltRounded className="ml-2" size={16} />
                        </button>
                    </div>
                    <div className="mt-3 space-y-3">
                        <button
                            type="button"
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            onClick={sellerGoogle}
                        >
                            <span className="mr-2 inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-6 h-6' viewBox="0 0 48 48">
                                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                            </span>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
