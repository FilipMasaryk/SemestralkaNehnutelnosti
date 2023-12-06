import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const schema = Joi.object({
    lokalita: Joi.string().required().min(3).label("Lokalita"),
    cena: Joi.number().integer().required().greater(0).label("Cena v €"),
    velkost: Joi.number().required().integer().greater(0).label("Veľkosť v m2"),
    izby: Joi.number().integer().required().greater(0).label("Počet izieb"),
    telcislo: Joi.string().length(10).required().label("Kontakt"),
});

interface FormData {
    lokalita: string;
    cena: number;
    velkost: number;
    izby: number;
    telcislo: string;
}

function AddProperty() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: joiResolver(schema) });
    return (
        <>
            <div className="container" >
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className="containerRegistration">
                        <h2>Pridanie nehnuteľnosti</h2>
                        <hr />

                        <label htmlFor='lokalita'><b>Lokalita</b></label>
                        <input  {...register("lokalita")} type="text" placeholder="Zadaj lokalitu" name="lokalita" id="meno" />
                        {errors.lokalita && <p className="text-danger"> {errors.lokalita.message} </p>}

                        <label htmlFor='cena'><b>Cena v €</b></label>
                        <input  {...register("cena")} type="text" placeholder="Zadaj cenu" name="cena" id="cena" />
                        {errors.cena && <p className="text-danger"> {errors.cena.message} </p>}

                        <label htmlFor='velkost'><b>Veľkosť v m2</b></label>
                        <input  {...register("velkost")} type="text" placeholder="Zadaj veľkosť" name="velkost" id="velkost" />
                        {errors.velkost && <p className="text-danger"> {errors.velkost.message} </p>}

                        <label htmlFor='izby'><b>Počet izieb</b></label>
                        <input  {...register("izby")} type="text" placeholder="Zadaj počet izieb" name="izby" id="izby" />
                        {errors.izby && <p className="text-danger"> {errors.izby.message} </p>}

                        <label htmlFor='telcislo'><b>Kontakt</b></label>
                        <input  {...register("telcislo")} type="text" placeholder="Zadaj telefónne číslo" name="telcislo" id="zopakujHeslo" />
                        {errors.telcislo && <p className="text-danger"> {errors.telcislo.message} </p>}

                        <label htmlFor='fotky'><b>Fotky  </b></label>
                        <input type="file" multiple accept=".png, .jpg, .jpeg" id="fotky" name="fotky" />

                        <button type="submit" className="registerbtn">Pridať nehnuteľnosť</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default AddProperty
