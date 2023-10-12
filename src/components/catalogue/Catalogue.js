import React from 'react'
import './catalogue.css'
import { Link } from 'react-router-dom';

function Catalogue() {

    return (
        <div className='catalogue'>
            <div className='catalogueContainer '>
                <div className='catalogueBox'>
                    <div className='catalogueImgA mr-1.5' >
                        <Link to='category/clothing' className='relative'>
                            <img className='catalogueImg ' src="https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg" alt="" />
                            <span className='catalogueTxt font-sans z-10 text-white font-bold absolute bottom-5'>Clothing</span>
                        </Link>
                    </div>
                    <div className='catalogueImgB ml-1.5'>
                        <Link to='category/phones' className='relative'>
                            <img className='catalogueImg' src="https://m-cdn.phonearena.com/images/article/64576-wide-two_1200/The-Best-Phones-to-buy-in-2023---our-top-10-list.jpg" alt="" />
                            <span className='catalogueTxt font-sans text-white font-bold absolute bottom-5'>Phones</span>
                        </Link>
                    </div>
                </div>
                <div className='catalogueBox'>
                    <div className='catalogueImgB mr-1.5' >
                        <Link to='category/laptop' className='relative'>
                            <img className='catalogueImg ' src="https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg" alt="" />
                            <span className='catalogueTxt font-sans z-10 text-white font-bold absolute bottom-5'>Laptop</span>
                        </Link>
                    </div>
                    <div className='catalogueImgA ml-1.5'>
                        <Link to='category/camera' className='relative'>
                            <img className='catalogueImg' src="https://www.epiphan.com/wp-content/uploads/2019/03/choosing-a-live-streaming-camera_Main.jpg" alt="" />
                            <span className='catalogueTxt font-sans z-10 text-white font-bold absolute bottom-5'>Camera</span>
                        </Link>
                    </div>
                </div>

            </div >
        </div >
    );
}


export default Catalogue