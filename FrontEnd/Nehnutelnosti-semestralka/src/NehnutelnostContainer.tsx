import { useState } from 'react'

function NehnutelnostContainer() {
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
        <div className="card">
            <img src="images/Sale1.jpg" alt="House" className="cardPicture"/>
            
            <div  className="card_details">
                <span className="tag">Bratislava</span>

                <div className="price">200 000€</div>

                <p>40m2, 4 bedrooms</p>
                <div className="flex-parent-element">
                    <div className="contact" style={{flex: 1}}><i className="fa fa-phone"></i> 0910501846</div>
                    <button className="buttonOblubene"><i className="fa fa-thumbs-o-up"></i></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default NehnutelnostContainer
