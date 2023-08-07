import React from 'react'
import './card.css'
import FavoriteIcon from '@mui/icons-material/Favorite';

function Card({ product }) {
    const formatter = new Intl.NumberFormat('en-IN', { currency: 'INR', })

    const trim = (str, n) => {
        return str?.length > n ? str.slice(0, str.charAt(n) === " " ? n - 1 : n) + "..." : str
    }
    return (
        <div className='card'>
            <div className='cardImageBox cursorPointer flexCenter'>
                <img className='cardImage' src={product.imageSrc} alt="" />
            </div>
            <div className='cardDetail flexCenter'>
                <p className='cardName cursorPointer'>{trim(product.name, 50)}</p>
                <div className='cardPriceBox flexCenter'>
                    <div className='cardPrice'><span className='cardCurrency'>₹</span>{formatter.format(product.price)}</div>
                    <FavoriteIcon className='cardWish cursorPointer' />
                </div>
            </div>
        </div>
    )
}

export default Card