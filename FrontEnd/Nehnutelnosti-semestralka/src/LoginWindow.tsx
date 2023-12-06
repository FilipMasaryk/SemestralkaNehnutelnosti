import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const schema = Joi.object({
  menoPrihlasenie: Joi.string().required().min(3).label("Meno"),
  hesloPrihlasenie: Joi.string().required().min(5).label("Heslo"),
});


interface FormData {
  menoPrihlasenie: string;
  hesloPrihlasenie: string;
}


function LoginWindow() {

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: joiResolver(schema) });
  return (
    <>
      <div className="container" >
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="containerRegistration">
            <h2>Prihlásenie</h2>
            <hr />

            <div>
              <label htmlFor='menoPrihlasenie'><b>Meno</b></label>
              <input {...register("menoPrihlasenie")} type="text" placeholder="Zadaj meno" name="menoPrihlasenie" id="meno" />
              {errors.menoPrihlasenie && <p className="text-danger"> {errors.menoPrihlasenie.message} </p>}
            </div>

            <div>
              <label htmlFor='hesloPrihlasenie'><b>Heslo</b></label>
              <input {...register('hesloPrihlasenie')} type="password" placeholder="Zadaj heslo" name="hesloPrihlasenie" id="heslo" />
              {errors.hesloPrihlasenie && <p className="text-danger"> {errors.hesloPrihlasenie.message} </p>}
            </div>

            <button type="submit" className="registerbtn">Prihlásiť sa</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginWindow
