import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import LoginWindow from './LoginWindow';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const schema = Joi.object({
    pridanieLokalita: Joi.string().required().min(3).label("Lokalita"),
    pridanieCena: Joi.number().integer().required().greater(0).less(1000000000).label("Cena v €"),
    pridanieVelkost: Joi.number().required().integer().greater(0).less(1000000000).label("Veľkosť v m2"),
    pridanieIzby: Joi.number().integer().required().greater(0).less(1000000000).label("Počet izieb"),
    pridanieTelcislo: Joi.string().length(10).required().label("Kontakt"),
});

interface FormData {
    pridanieLokalita: string;
    pridanieCena: number;
    pridanieVelkost: number;
    pridanieIzby: number;
    pridanieTelcislo: string;
}

function AddProperty() {
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    let PropertyId: number = 0;
    const notifySuccessfulPropertyAdd = () => {
        toast.success('Property added successfully', {
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
    const formData = new FormData();
    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedFiles(files);
        //console.log(selectedFiles);
    };
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: joiResolver(schema) });
    function pridajNehnutelnost(lokalita: string, cena: number, velkost: number, izby: number, telcislo: string) {
        const newProperty = {
            location: lokalita,
            price: cena,
            size: velkost,
            bedroom_size: izby,
            phone_number: telcislo
        }

        //console.log(newProperty);
        console.log(selectedFiles);

        fetch('http://localhost:5174/api/properties/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify(newProperty)
        }).then(res => res.json()).then(data => {
            PropertyId = data.newPropertyId;
            console.log(PropertyId)

            if (!selectedFiles) {
                notifySuccessfulPropertyAdd();
                navigate('/');
                return;
            }

            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("images", selectedFiles[i]);
            }
            //formData.append('images', selectedFiles);

            if (PropertyId !== 0) {
                console.log("AAAAAAAA")
                fetch(`http://localhost:5174/api/photos/${PropertyId}`, {
                    method: 'POST',
                    headers: {
                        //'Content-Type': 'multipart/form-data',
                        //'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                    body: formData,
                }).then(res => {
                    if (res.status === 401) {
                        console.log("Property with that ID doesnt exist");
                        return;
                    } else if (res.status === 402) {
                        console.log('No files were uploaded.')
                        return;
                    } else if (res.status === 403) {
                        console.log("Photo with this name already exists")
                        return;
                    } else {
                        notifySuccessfulPropertyAdd();
                        navigate('/');
                        return;
                    }
                })
            }
        })



    }
    return (
        <>
            <div className="container" >
                <form onSubmit={handleSubmit((data) => pridajNehnutelnost(data.pridanieLokalita, data.pridanieCena, data.pridanieVelkost, data.pridanieIzby, data.pridanieTelcislo))}>
                    <div className="containerRegistration">
                        <h2>Pridanie nehnuteľnosti</h2>
                        <hr />

                        <label htmlFor='pridanieLokalita'><b>Lokalita</b></label>
                        <input  {...register("pridanieLokalita")} type="text" placeholder="Zadaj lokalitu" name="pridanieLokalita" id="lokalita" />
                        {errors.pridanieLokalita && <p className="text-danger"> {errors.pridanieLokalita.message} </p>}

                        <label htmlFor='pridanieCena'><b>Cena v €</b></label>
                        <input  {...register("pridanieCena")} type="text" placeholder="Zadaj cenu" name="pridanieCena" id="cena" />
                        {errors.pridanieCena && <p className="text-danger"> {errors.pridanieCena.message} </p>}

                        <label htmlFor='pridanieVelkost'><b>Veľkosť v m2</b></label>
                        <input  {...register("pridanieVelkost")} type="text" placeholder="Zadaj veľkosť" name="pridanieVelkost" id="velkost" />
                        {errors.pridanieVelkost && <p className="text-danger"> {errors.pridanieVelkost.message} </p>}

                        <label htmlFor='pridanieIzby'><b>Počet izieb</b></label>
                        <input  {...register("pridanieIzby")} type="text" placeholder="Zadaj počet izieb" name="pridanieIzby" id="izby" />
                        {errors.pridanieIzby && <p className="text-danger"> {errors.pridanieIzby.message} </p>}

                        <label htmlFor='pridanieTelcislo'><b>Kontakt</b></label>
                        <input  {...register("pridanieTelcislo")} type="text" placeholder="Zadaj telefónne číslo" name="pridanieTelcislo" id="telcislo" />
                        {errors.pridanieTelcislo && <p className="text-danger"> {errors.pridanieTelcislo.message} </p>}

                        <label htmlFor='fotky'><b>Fotky  </b></label>
                        <input type="file" multiple accept=".png, .jpg, .jpeg" id="fotkyId" name="fotky" onChange={handleFileInput} />

                        <button type="submit" className="registerbtn">Pridať nehnuteľnosť</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default AddProperty
