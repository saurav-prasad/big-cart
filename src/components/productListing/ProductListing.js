import React from 'react'
import './productListing.css'
import Card from '../card/Card'

function ProductListing() {
    const products = [
        {
            id: 1,
            name: 'OnePlus Nord CE 3 5G (Aqua Surge, 8GB RAM, 128GB Storage)',
            imageSrc: "https://m.media-amazon.com/images/I/6175SlKKECL._SX679_.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: 26998,
            color: 'Black',
        },
        {
            id: 2,
            name: 'OnePlus Nord Buds 2 True Wireless in Ear Earbuds with Mic, Upto 25dB ANC 12.4mm Dynamic Titanium Drivers, Playback:Upto 36hr case, 4-Mic Design, IP55 Rating, Fast Charging [Thunder Gray]',
            imageSrc: 'https://m.media-amazon.com/images/I/61-ZYvldY+L._SX679_.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: 2999,
            color: 'Black',
        },
        {
            id: 3,
            name: "IndoPrimo Men's Regular Fit Cotton Casual Checkered Shirt for Men Full Sleeves",
            imageSrc: 'https://m.media-amazon.com/images/I/71xZY5-a1oL._UY741_.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '498',
            color: 'Black',
        },
        {
            id: 4,
            name: 'Nikon D850 45.7MP Digital SLR Camera (Black) with AF-S Nikkor 24-120mm F/4G ED VR Lens and 64GB Memory Card',
            imageSrc: 'https://m.media-amazon.com/images/I/81WtQ64-SOL._SX522_.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: 245990,
            color: 'Black',
        },
        {
            id: 5,
            name: 'Samsung Galaxy Book3 Pro 360 Intel 13th Gen i7 EvoTM 40.62cm(16") Touchscreen 2-in-1 3K Display, 120Hz, Thin & Light Laptop(16 GB/1 TB SSD/Windows 11/MS Office/S-Pen/Graphite/1.6Kg), NP960QFG-KA3IN',
            href: '#',
            imageSrc: 'https://m.media-amazon.com/images/I/71ef1yicMJL._SX679_.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: 179990,
            color: 'Black',
        },
        // More products...
    ]
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl mb-12 font-bold tracking-tight text-gray-900">Our Products</h2>

                <div className=" mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => <Card key={product.key} product={product}/>)}
                </div>
            </div>
        </div>
    )
}

export default ProductListing