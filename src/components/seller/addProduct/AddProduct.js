import { PhotoIcon } from '@heroicons/react/24/solid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import db, { storage } from '../../../firebase'
import { v4 } from 'uuid'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import addToSubCollection from '../../../firestoreQuery/addToSubCollection'
import { useSellerState } from '../sellerContext/SellerState'
import { addDoc, collection } from 'firebase/firestore'

export default function AddProduct() {
    const [{ sellerDetails }, dispatch] = useSellerState()
    const [imageUpload, setImageUpload] = useState()
    const [detail, setDetail] = useState({ name: "", description: "", category: "clothing", imageSrc: "", price: null, originalPrice: null, tags: "", sellerId: sellerDetails?.uid })

    const onChange = (e) => {
        setDetail({
            ...detail,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(detail);
        // addToSubCollection("items", sellerDetails.uid, detail.category, detail)
        // Add a new document with a generated id.
        const a = collection(db, "items", "doc", "subColl")
        const docc = await addDoc(a, detail)
        console.log(docc);
    }

    const handleImageUpload = (e) => {
        e.preventDefault()
        if (!imageUpload) return
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then((response) => {
            getDownloadURL(response.ref).then((response) => {
                setDetail({
                    ...detail,
                    imageSrc: response,
                })
            })
        })
    }

    return (
        <form className='bg-white p-10' onSubmit={onSubmit}>
            <div className="space-y-12 ">
                <div className="border-b border-gray-900/10 pb-8">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Product Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Product name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <textarea
                                        type="text"
                                        name="name"
                                        value={detail.name}
                                        onChange={onChange}
                                        id="username"
                                        rows={3}
                                        className="block p-3 w-full rounded-md font-medium border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    required
                                    id="about"
                                    name="description"
                                    value={detail.description}
                                    onChange={onChange}
                                    rows={4}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3 text-lg font-medium sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your product.</p>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Product photo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="imageSrc"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a image</span>
                                            <input required id="imageSrc" onChange={(e) => { setImageUpload(e.target.files[0]) }} name="imageSrc" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, JPEG</p>
                                    <p className="text-xs leading-5 text-gray-600">{imageUpload && imageUpload?.name}</p>
                                </div>
                            </div>
                            <button
                                disabled={imageUpload ? false : true}
                                onClick={handleImageUpload}
                                type="button"
                                className="rounded-md bg-indigo-600 mt-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Upload image<FileUploadRoundedIcon />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="col-span-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Tags
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    id="email"
                                    name="tags"
                                    value={detail.tags}
                                    onChange={onChange}
                                    type="text"
                                    className="block text-lg font-medium w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder='Shirts, Casual, Cotton'
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    onChange={(e) => {
                                        setDetail({
                                            ...detail,
                                            category: e.target.value.toLowerCase(),
                                        })
                                    }}
                                    required
                                    id="category"
                                    name="category"
                                    autoComplete="category-name"
                                    className="block mx-auto w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>Clothing</option>
                                    <option>Shoes</option>
                                    <option>Phones</option>
                                    <option>Laptop</option>
                                    <option>Grocery</option>
                                    <option>Accessories</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="originalPrice" className="block text-sm font-medium leading-6 text-gray-900">
                                Original Price
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">₹</span>
                                    <input
                                        value={detail.originalPrice}
                                        onChange={onChange}
                                        type="number"
                                        name="originalPrice"
                                        id="originalPrice"
                                        className="block text-lg font-medium flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Sale Price
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">₹</span>
                                    <input
                                        required
                                        value={detail.price}
                                        onChange={onChange}
                                        type="number"
                                        name="price"
                                        id="price"
                                        autoComplete="username"
                                        className="block text-lg font-medium flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button> */}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add to Inventory
                </button>
            </div>
        </form>
    )
}
