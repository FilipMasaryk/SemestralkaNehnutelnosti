import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import NehnutelnostData from './NehnutelnostData.ts';
import NehnutelnostCardImages from './NehnutelnostCardImages.tsx';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface NehnutelnostCardProps {
    data: NehnutelnostData,
    images: string[]
}

const schema = Joi.object({
    editCena: Joi.number().integer().required().greater(0).less(1000000000).label("Cena v €"),
    editTelcislo: Joi.string().length(10).required().label("Kontakt"),
});

interface FormData {
    editCena: number;
    editTelcislo: string;
}

function MemberNehnutelnostiCard(props: NehnutelnostCardProps) {
    const navigate = useNavigate();
    const [isOn, setIsOn] = useState(true);
    const [modal, setModal] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: joiResolver(schema) });
    const [editPrice, setEditPrice] = useState<number>(props.data.price);
    const [editPhone, setEditPhone] = useState(props.data.phone_number);

    const notifySuccessfulPropertyEdit = () => {
        toast.success('Property edited successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    function editNehnutelnost(cena: number, telcislo: string) {
        const editProperty = {
            price: cena,
            phone_number: telcislo,
        }

        fetch(`http://localhost:5174/api/properties/${props.data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify(editProperty)
        }).then(res => {
            if (res.status === 401) {
                console.log("Property with that ID doesnt exist");
                return;
            } else if (res.status === 402) {
                console.log('Validation error')
                return;
            } else {
                notifySuccessfulPropertyEdit();
                setModal(!modal);
                navigate('/');
                return;
            }
        })
    }

    const toggleModal = () => {
        setEditPrice(props.data.price);
        console.log(props.data.price);
        console.log(editPrice);
        setModal(!modal);
    };


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
                            <button className={"buttonEdit"} onClick={toggleModal}>
                                <i className="fa fa-edit myIcon" ></i>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                null
            )}

            {modal && (
                <div className="modal" id='editModal'>
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="containerEditWindow" >
                        <form onSubmit={handleSubmit((data) => editNehnutelnost(data.editCena, data.editTelcislo))}>
                            <div className="containerEdit">
                                <h2>Edit nehnuteľnosti</h2>
                                <hr />
                                <label htmlFor='pridanieCena'><b>Cena v €</b></label>
                                <input  {...register("editCena")} type="text" placeholder="Zadaj cenu" name="editCena" id="cena" defaultValue={props.data.price} onChange={(e) => setEditPrice(e.target.value)} />
                                {errors.editCena && <p className="text-danger"> {errors.editCena.message} </p>}

                                <label htmlFor='editTelcislo'><b>Kontakt</b></label>
                                <input  {...register("editTelcislo")} type="text" placeholder="Zadaj telefónne číslo" name="editTelcislo" id="telcislo" defaultValue={props.data.phone_number} onChange={(e) => setEditPhone(e.target.value)} />
                                {errors.editTelcislo && <p className="text-danger"> {errors.editTelcislo.message} </p>}

                                <button type="submit" className="registerbtn">Upraviť nehnuteľnosť</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default MemberNehnutelnostiCard;