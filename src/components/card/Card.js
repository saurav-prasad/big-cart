import React from 'react'

function Card({ product }) {
    console.log(product.name);
    return (
        <div>

            <span>{product.name}</span>
            <img src={product.imageSrc} alt="" />

        </div>
    )
}

export default Card