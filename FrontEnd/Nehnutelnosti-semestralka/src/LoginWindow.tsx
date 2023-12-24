import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  let IdPrihlasenehoMembera: number;

  const notifySuccessfulLogin = () => {
    toast.success('Login successful', {
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

  function loginMember(meno: string, heslo: string) {
    const newMember = {
      name: meno,
      password: heslo
    }

    fetch('http://localhost:5174/api/members/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMember)
    }).then(res => {
      if (res.status === 401) {
        console.log("Member with that name does not exist");
        setError("Member with that name does not exist")
        return;
      } else if (res.status === 402) {
        console.log("Invalid password");
        setError("Invalid password")
        return;
      }
      res.json().then((resultObject) => {
        console.log(resultObject.result);
        setError(null);
        sessionStorage.setItem('token', resultObject.token);
        notifySuccessfulLogin();
        navigate('/');

        fetch(`http://localhost:5174/api/members/getId/${newMember.name}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
          .then((data) => {
            IdPrihlasenehoMembera = data.id;
            console.log('Member ID:', IdPrihlasenehoMembera);
          })

      })
      return res.json;
    })
  }
  return (
    <>
      <div className="container" >
        <form onSubmit={handleSubmit((data) => loginMember(data.menoPrihlasenie, data.hesloPrihlasenie))}>
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
              {error && <p className='text-danger'>{error}</p>}
            </div>

            <button type="submit" className="registerbtn">Prihlásiť sa</button>
          </div>
        </form>
      </div>
    </>
  )

}
export default LoginWindow
