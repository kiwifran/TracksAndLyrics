import React from "react";
import animateScrollTo from 'animated-scroll-to';
//make a reusable button component using props for the two buttons loaded respectively with track search results and lyrics search result. When users click the button, the page will go up to a specific part of the app for a better user experience
function GoUpButton (props){
    const scrollUp= ()=>{
        animateScrollTo(document.querySelector(`.${props.locationClass}`))
    }
    return(
        <button 
            tabIndex={props.tabIndex}
            className="longButton quickScrollUp" 
            onClick={()=>{scrollUp()}} > {props.showText}
        </button>
    )
}
export default GoUpButton;