import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import NehnutelnostData from './NehnutelnostData.ts';
import NehnutelnostCardImages from './NehnutelnostCardImages.tsx';

interface NehnutelnostCardProps {
    data: NehnutelnostData,
    images: string[]
}

function NehnutelnostCard(props: NehnutelnostCardProps) {
    const [isOn, setIsOn] = useState(false);
    const [isTokenPresent, setIsTokenPresent] = useState<boolean>(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (token) {
            setIsTokenPresent(true);
        } else {
            setIsTokenPresent(false);
        }
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5174/api/favorites/${props.data.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        }).then(res => {
            if (res.status === 201) {
                setIsOn(false);
            } else {
                setIsOn(true);
            }
        })
    }, []);


    const newFavoriteProperty = {
        property_id: props.data.id
    }

    const handleClick = () => {
        if (!isOn) {
            fetch('http://localhost:5174/api/favorites/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify(newFavoriteProperty)
            }).then(res => {
                if (res.status === 201) {
                    console.log("Favorite Property created successfully")
                }
            })
            setIsOn(true);
        } else {
            fetch('http://localhost:5174/api/favorites/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify(newFavoriteProperty)
            }).then(res => {
                if (res.status === 201) {
                    console.log("Favorite Property deleted successfully")
                }
            })
            setIsOn(false);
        }
    }


    return (
        <>
            <div className="card" key={props.data.id}>

                <NehnutelnostCardImages images={props.images} />


                <div className="card_details">
                    <span className="tag">{props.data.location}</span>

                    <div className="price">{props.data.price} €</div>

                    <p>{props.data.size}m2 {props.data.bedroom_size} izby</p>
                    <div className="flex-parent-element">
                        <div className="contact" style={{ flex: 1 }}><i className="fa fa-phone"></i> {props.data.phone_number}</div>
                        <button className={isOn && isTokenPresent ? 'buttonOblubeneOn' : 'buttonOblubeneOff'} onClick={handleClick} disabled={!isTokenPresent}>
                            <i className="fa fa-thumbs-o-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NehnutelnostCard;