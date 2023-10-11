import React from 'react'
import './wishListCard.css'
import { useNavigate } from 'react-router-dom'
import sliceString from '../../sliceString/sliceString'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { useWishListState } from '../../context/wishList/WishListState'
import { useCartState } from '../../context/cart/CartState'

function WishListCard({ product, showAlert }) {
    const navigate = useNavigate()
    const { deleteWishItem } = useWishListState()
    const { addCart } = useCartState()

    const addToCart = () => {
        console.log("addToCart", product);
        showAlert({ status: true, text: 'Item added to cart', type: 'success' });
        addCart({ ...product, qnt: 1 });
    }
    
    const removeFromWishList = () => {
        showAlert({ status: true, text: 'Item removed from WishList', type: 'success' });
        // deleteWishItem(product);
        deleteItem(product)
    }
    const deleteItem = (pro) => { deleteWishItem(pro) }

    return (
        <div className="rounded-md border relative">
            <img
                src={product.imageSrc}
                alt={product.name}
                className="object-contain h-72 w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
            />
            <FavoriteTwoToneIcon onClick={() => removeFromWishList()} fontSize='medium' className='absolute right-2 top-2 cardWish cursor-pointer' />
            <div className="p-4">
                <h1 onClick={() => { navigate(`/detail/${product.productId}`) }} className="inline-flex items-center text-lg font-semibold">{sliceString(product.name, 20)}</h1>
                <p onClick={() => { navigate(`/detail/${product.productId}`) }} className="mt-3 text-sm text-gray-600">
                    {sliceString(product.description, 50)}
                </p>
                <button
                    type="button"
                    className="mt-4 w-full rounded-sm bg-black px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={(e) => { addToCart(); e.preventDefault() }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default WishListCard