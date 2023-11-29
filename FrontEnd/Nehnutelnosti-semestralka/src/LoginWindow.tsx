import { useState } from 'react'

function LoginWindow() {
  return (
    <>
      <div className="container" >
        <form>
          <div className="containerRegistration">
            <h2>Prihlásenie</h2>
            <hr />

            <label><b>Meno</b></label>
            <input type="textRegister" placeholder="Zadaj meno" name="menoPrihlasenie" id="menoPrihlasenie" required />
            <label><b>Heslo</b></label>
            <input type="password" placeholder="Zadaj heslo" name="hesloPrihlasenie" id="hesloPrihlasenie" required />
            <button type="submit" className="registerbtn">Prihlásiť sa</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginWindow
