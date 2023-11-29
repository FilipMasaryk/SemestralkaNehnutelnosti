import { useState } from 'react'

function RegistrationWindow() {
    return (
        <>
            <div className="container" >
                <form>
                    <div className="containerRegistration">
                        <h2>Registrácia</h2>
                        <hr />

                        <label><b>Meno</b></label>
                        <input type="textRegister" placeholder="Zadaj meno" name="meno" id="meno" required />

                        <label><b>Heslo</b></label>
                        <input type="password" placeholder="Zadaj heslo" name="heslo" id="heslo" required />

                        <label><b>Potvrdenie hesla</b></label>
                        <input type="password" placeholder="Zadaj heslo" name="zopakujHeslo" id="zopakujHeslo" required />
                        <button type="submit" className="registerbtn">Registrovať</button>

                        <p className="uzZaregistrovany">Ste už zaregistrovaný? <a href="#prihlasenie">Prihláste sa</a>.</p>
                    </div>

                </form>
            </div>
        </>
    )
}

export default RegistrationWindow
