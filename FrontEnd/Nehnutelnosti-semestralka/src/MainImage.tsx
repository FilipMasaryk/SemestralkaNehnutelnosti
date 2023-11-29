import { useState } from 'react'

function MainImage() {
 /* function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
      }*/

  return (
    <>
     <div className="container" style={{ maxWidth: '100%' }}>
        <img src="/images/house2.jpg" alt="House" className="responsiveImage"/>
        <div className="centered">
            <div className="search">
                <input type="text" placeholder="Search.." className="searchTerm"/>
                <button type="submit" className="searchButton"><i className="fa fa-search"></i>
                </button>
            </div>
        </div>
     </div>
    </>
  )
}

export default MainImage
