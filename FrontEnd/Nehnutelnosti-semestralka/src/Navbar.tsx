import { useContext, useState } from 'react'
import { Link, redirect } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { authContext } from './App';

function Navbar() {
  const myElementRef = useRef<HTMLDivElement>(null);
  const { authenticated, setAuthenticated } = useContext(authContext);
  function myFunction() {
    const element = myElementRef.current;
    if (element?.className === "topnav") {
      element.className += " responsive";
    } else if (element !== null) {
      element.className = "topnav";
    }
  }
  const handleClickOdhlasenie = () => {
    sessionStorage.removeItem('token');
    setAuthenticated(false)
    redirect('/');
  }

  return (
    <>
      <div ref={myElementRef} className="topnav" id="myTopnav">
        <CustomLink to="/"><i className="fa fa-list"> </i> Nehnutelnosti</CustomLink>
        {authenticated ? (
          <div>
            <CustomLink to="/pridanie"><i className="fa fa-plus-circle"> </i> Pridať</CustomLink>
            <CustomLink to="/oblubene"><i className="fa fa-thumbs-up"> </i> Obľúbené</CustomLink>
            <CustomLink to="/vasenehnutelnosti"><i className="fa fa-address-book"> </i> Vaše nehnuteľnosti</CustomLink>
          </div>
        ) : (
          null
        )}
        <div className="loginAndRegister" >
          {authenticated ? (
            <div>
              <CustomLink to="/zmenahesla"><i className="fa fa-key"> </i> Zmena hesla</CustomLink>
              <Link to="/" onClick={handleClickOdhlasenie}><i className="fa fa-user-plus"> </i> Odhlásiť sa</Link>
            </div>
          ) : (
            <div>
              <CustomLink to="/registracia"><i className="fa fa-user-plus"> </i> Registrácia</CustomLink>
              <CustomLink to="/prihlasenie"><i className="fa fa-fw fa-user"></i> Prihlásenie</CustomLink>
            </div>
          )}
        </div>
        <a href="javascript:void(0);" className="icon" onClick={myFunction}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
    </>
  )
}

function CustomLink(props:
  { to: string, children: React.ReactNode }
) {
  const location = useLocation();
  const { pathname } = location;

  //console.log(pathname);
  return (
    <Link to={props.to} className={pathname === props.to ? "active" : ""} >
      {props.children}
    </Link>
  )
}

export default Navbar
