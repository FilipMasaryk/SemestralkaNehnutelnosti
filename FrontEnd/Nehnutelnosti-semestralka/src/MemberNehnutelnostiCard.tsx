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

function MemberNehnutelnostiCard(props: NehnutelnostCardProps) {
    const [isOn, setIsOn] = useState(true);
    const handleClickDelete = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this property?');

        if (isConfirmed) {
            fetch(`http://localhost:5174/api/photos/all/${props.data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
            }).then(res => {
                if (res.status === 201) {
                    //console.log("Photos deleted successfully")
                }
            })

            fetch(`http://localhost:5174/api/favorites/delete/${props.data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
            }).then(res => {
                if (res.status === 201) {
                    //console.log("Favorite properties removed succesfully")
                }
            })

            fetch(`http://localhost:5174/api/properties/${props.data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
            }).then(res => {
                if (res.status === 201) {
                    console.log("Property deleted successfully")
                }
            })
            setIsOn(false);
        } else {
            return;
        }
    }


    return (
        <>
            {isOn ? (
                <div className="card" key={props.data.id}>

                    <button className={"buttonDelete"}>
                        <i className="fa fa-trash myIcon" onClick={handleClickDelete}></i>
                    </button>

                    <NehnutelnostCardImages images={props.images} />
                    <div className="card_details">
                        <span className="tag">{props.data.location}</span>

                        <div className="price">{props.data.price} €</div>

                        <p>{props.data.size}m2 {props.data.bedroom_size} izby</p>
                        <div className="flex-parent-element">
                            <div className="contact" style={{ flex: 1 }}><i className="fa fa-phone"></i> {props.data.phone_number}</div>
                            <button className={"buttonEdit"} >
                                <i className="fa fa-edit myIcon" ></i>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                null
            )}
        </>
    );
}

export default MemberNehnutelnostiCard;