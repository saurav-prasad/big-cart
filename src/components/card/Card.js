import React from 'react'
import './card.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Card({ product }) {
    const formatter = new Intl.NumberFormat('en-IN', { currency: 'INR', })
    // const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })

    const trim = (str, n) => {
        return str?.length > n ? str.slice(0, str.charAt(n) === " " ? n - 1 : n) + "..." : str
    }
    return (
        <div className='card'>
            <div className='cardImageBox cursorPointer flexCenter'>
                <img className='cardImage' src="https://m.media-amazon.com/images/I/611mRs-imxL._AC_UL320_.jpg" alt="" />
            </div>
            <div className='cardDetail'>
                <p className='cardName cursorPointer'>{trim("Apple 2023 MacBook Pro Laptop M2 Pro chip with 12‑core CPU and 19‑core GPU: 33.74 cm (14.2-inch), 16GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Silver", 50)}</p>
                <div className='cardPriceBox flexCenter'>
                    <div className='cardPrice'>₹{formatter.format(229990)}</div>
                    <FavoriteIcon className='cardWish cursorPointer'/>
                </div>
            </div>
        </div>
    )
}

export default Card