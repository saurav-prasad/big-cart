import React, { useState } from 'react'
import './productListingCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import currencyFormatter from '../../currencyFormatter/currencyFormatter';
import sliceString from '../../sliceString/sliceString';
import Alrt from '../alrt/Alrt';
import { useWishListState } from '../../context/wishList/WishListState';
import { useUserState } from '../../context/UserState';

function Card({ product }) {
    const { addWish } = useWishListState()
    const [{ userDetails }] = useUserState()
    const navigate = useNavigate()
    const [alert, setAlert] = useState(null)

    const addToWishlist = (e) => {
        e.preventDefault()
        userDetails?.uid ? addData() : showAlert({ status: true, text: 'Sign-in first', type: 'error' })
    }
    const addData = () => {
        addWish(product)
        showAlert({ status: true, text: 'Item added to WishList', type: 'success' })
    }
    const showAlert = (data) => {
        setAlert(data)
        setTimeout(() => {
            setAlert(null);
        }, 800)
    }
    return (
        <div className='card flexCenter'>
            <div onClick={() => { navigate(`/detail/${product.productId}`) }} className='cardImageBox cursorPointer flexCenter'>
                <img className='cardImage' src={product.imageSrc} alt="" />
            </div>
            <div className='cardDetail flexCenter'>
                <p onClick={() => { navigate(`/detail/${product.productId}`) }} className='cardName cursorPointer'>{sliceString(product.name, 50)}</p>
                <div className='cardPriceBox flexCenter'>
                    <div className='cardPrice'>
                        <span className='cardCurrency'>₹</span>{currencyFormatter(product.price)}
                        <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-lg">
                            {product?.discountPrice && `₹${currencyFormatter(product?.discountPrice)}`}
                        </span>
                    </div>
                    <FavoriteIcon onClick={addToWishlist} className='cardWish cursorPointer' />
                </div>
            </div>
            <Alrt showAlert={alert?.status} text={alert?.text} type={alert?.type} />
        </div>
    )
}

export default Card