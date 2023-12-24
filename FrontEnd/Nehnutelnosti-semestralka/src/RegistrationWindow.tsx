import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: joiResolver(schema) });
    const [error, setError] = useState<string | null>(null);
    const notifySuccessfulRegister = () => {
        toast.success('Registration successful', {
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

    function registerMember(meno: string, heslo: string, potvrdenieHesla: string) {

        const newMember = {
            name: meno,
            password: heslo
        }

        fetch('http://localhost:5174/api/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMember)
        }).then(res => {
            if (!res.ok) {
                console.log("Member with that name alredy exists");
                setError("Member with that name alredy exists")
                return;
            }
            res.json().then((resultObject) => {
                notifySuccessfulRegister();
                navigate('/')
                console.log(resultObject.result);
            })
            return res.json;
        })
    }


    return (
        <>
            <div className="container" >
                <form onSubmit={handleSubmit((data) => {
                    if (data.hesloRegistracia === data.zopakujHesloRegistracia) {
                        registerMember(data.menoRegistracia, data.hesloRegistracia, data.zopakujHesloRegistracia);
                        setError(null);
                    } else {
                        console.log("Hesla sa nezhoduju");
                        setError("Hesla sa nezhoduju");
                    }
                })}>
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
                        {error && <p className='text-danger'>{error}</p>}
                        <button type="submit" className='registerbtn'>Registrovať</button>

                        <p className="uzZaregistrovany">Ste už zaregistrovaný? <a href="#prihlasenie">Prihláste sa</a>.</p>
                    </div>

                </form>
            </div>
        </>
    )
}

export default RegistrationWindow
