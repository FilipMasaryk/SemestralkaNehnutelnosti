import { useState } from 'react'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

function Navbar() {
  const myElementRef = useRef<HTMLDivElement>(null);

  function myFunction() {
    const element = myElementRef.current;
    if (element?.className === "topnav") {
      element.className += " responsive";
    } else if (element !== null) {
      element.className = "topnav";
    }
  }

  return (
    <>
      <div ref={myElementRef} className="topnav" id="myTopnav">
        <CustomLink to="/"><i className="fa fa-list"> </i> Nehnutelnosti</CustomLink>
        <CustomLink to="/pridanie"><i className="fa fa-plus-circle"> </i> Pridať</CustomLink>
        <CustomLink to="/oblubene"><i className="fa fa-thumbs-up"> </i> Obľúbené</CustomLink>
        <CustomLink to="/vasenehnutelnosti"><i className="fa fa-address-book"> </i> Vaše nehnuteľnosti</CustomLink>
        <div className="loginAndRegister" >
          <CustomLink to="/registracia"><i className="fa fa-user-plus"> </i> Registrácia</CustomLink>
          <CustomLink to="/prihlasenie"><i className="fa fa-fw fa-user"></i> Prihlásenie</CustomLink>
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
