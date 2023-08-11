import React from 'react'
import './card.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import currencyFormatter from '../../currencyFormatter/currencyFormatter';
import sliceString from '../../sliceString/sliceString';

function Card({ product }) {
    const navigate = useNavigate()
    return (
        <div onClick={() => { navigate(`/detail/${product.productId}`) }} className='card'>
            <div className='cardImageBox cursorPointer flexCenter'>
                <img className='cardImage' src={product.imageSrc} alt="" />
            </div>
            <div className='cardDetail flexCenter'>
                <p className='cardName cursorPointer'>{sliceString(product.name,50)}</p>
                <div className='cardPriceBox flexCenter'>
                    <div className='cardPrice'><span className='cardCurrency'>₹</span>{currencyFormatter(product.price)}</div>
                    <FavoriteIcon className='cardWish cursorPointer' />
                </div>
            </div>
        </div>
    )
}

export default Card