import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import NehnutelnostData from './NehnutelnostData.ts';

interface NehnutelnostCardImagesProps {
    images: string[]
}


function NehnutelnostCardImages(props: NehnutelnostCardImagesProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    function prevImage() {
        if (currentIndex === 0) {
            setCurrentIndex(props.images.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    }

    function nextImage() {
        if (currentIndex === props.images.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }


    return (
        <>
            <div>
                {props.images.map((image, index) => (
                    index === currentIndex ? (
                        <img key={index} src={`http://localhost:5174/images/${props.images[index]}`} className='cardPicture' />
                    ) : null
                ))}
            </div>
            {props.images.length > 1 ? (
                <div>
                    <div className='arrow-left'>
                        <BsChevronCompactLeft onClick={prevImage} size={35} />
                    </div>

                    <div className='arrow-right'>
                        <BsChevronCompactRight onClick={nextImage} size={35} />
                    </div>
                </div>
            ) : null}

            {props.images.length === 0 ? (
                <img src="/images/Sale1.jpg" className='cardPicture' />
            ) : null}
        </>
    );
}

export default NehnutelnostCardImages;