import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import NehnutelnostImage from './NehnutelnostImageData.ts';
import NehnutelnostData from './NehnutelnostData.ts';
import NehnutelnostCardFavorites from './NehnutelnostiCardFavorites.tsx';
import MemberNehnutelnostiCard from './MemberNehnutelnostiCard.tsx';

function MemberNehnutelnosti() {
    const [NehnutelnostImageList, setNehnutelnostImageList] = useState<NehnutelnostImage[]>([]);
    const [NehnutelnostDataList, setNehnutelnostDataList] = useState<NehnutelnostData[]>([]);

    const getImageNames = (id: number): string[] => {
        const filteredImages = NehnutelnostImageList
            .filter(image => image.property_id === id)
            .map(image => image.name);
        return filteredImages;
    }
    //console.log(getStringArray(4));
    useEffect(() => {
        //console.log("AAA");
        fetch(`http://localhost:5174/api/photos/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setNehnutelnostImageList(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [NehnutelnostDataList]);

    useEffect(() => {
        fetch('http://localhost:5174/api/properties/member/getMemberProperties', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setNehnutelnostDataList(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <div className="containerCard">
                {NehnutelnostDataList.length > 0 ? (
                    NehnutelnostDataList.map((NehnutelnostData) => (
                        <MemberNehnutelnostiCard data={NehnutelnostData} images={getImageNames(NehnutelnostData.id)} />
                    ))
                ) : (
                    <h1>No properties found</h1>
                )}
            </div>
        </>
    );
}

export default MemberNehnutelnosti
