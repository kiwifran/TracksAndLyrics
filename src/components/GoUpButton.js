import React from "react";
import animateScrollTo from 'animated-scroll-to';
function GoUpButton (props){
    const scrollUp= ()=>{
        animateScrollTo(document.querySelector(`.${props.locationClass}`))
    }
    return(
        <button className="quickScrollUp" onClick={()=>{scrollUp()}} > {props.showText}</button>
    )
}

export default GoUpButton;