import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const schema = Joi.object({
    menoRegistracia: Joi.string().required().min(3).label("Meno"),
    hesloRegistracia: Joi.string().required().min(5).label("Heslo"),
    zopakujHesloRegistracia: Joi.string().required().min(5).label("Potvrdenie hesla"),
});


interface FormData {
    menoRegistracia: string;
    hesloRegistracia: string;
    zopakujHesloRegistracia: string;
}

function RegistrationWindow() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: joiResolver(schema) });
    return (
        <>
            <div className="container" >
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className="containerRegistration">
                        <h2>Registrácia</h2>
                        <hr />

                        <label htmlFor='menoRegistracia'><b>Meno</b></label>
                        <input  {...register("menoRegistracia")} type="text" placeholder="Zadaj meno" name="menoRegistracia" id="meno" />
                        {errors.menoRegistracia && <p className="text-danger"> {errors.menoRegistracia.message} </p>}

                        <label htmlFor='hesloRegistracia'><b>Heslo</b></label>
                        <input  {...register("hesloRegistracia")} type="password" placeholder="Zadaj heslo" name="hesloRegistracia" id="heslo" />
                        {errors.hesloRegistracia && <p className="text-danger"> {errors.hesloRegistracia.message} </p>}

                        <label htmlFor='zopakujHesloRegistracia'><b>Potvrdenie hesla</b></label>
                        <input  {...register("zopakujHesloRegistracia")} type="password" placeholder="Zadaj heslo" name="zopakujHesloRegistracia" id="zopakujHeslo" />
                        {errors.zopakujHesloRegistracia && <p className="text-danger"> {errors.zopakujHesloRegistracia.message} </p>}

                        <button type="submit" className="registerbtn">Registrovať</button>

                        <p className="uzZaregistrovany">Ste už zaregistrovaný? <a href="#prihlasenie">Prihláste sa</a>.</p>
                    </div>

                </form>
            </div>
        </>
    )
}

export default RegistrationWindow
