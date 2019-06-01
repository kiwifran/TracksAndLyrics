import React from "react";
function RellaxDisplay(){
    return(
        <div className="rellaxWrapper">
            <div  aria-hidden  className="musicSign musicSign1 rellax"  data-rellax-speed="1">♫</div>
            <div  aria-hidden  className="musicSign musicSign2 rellax"  data-rellax-speed="3">♪</div>
            <div  aria-hidden  className="musicSign musicSign3 rellax"  data-rellax-speed="3">♬</div>
            <div  aria-hidden  className="musicSign musicSign4 rellax"  data-rellax-speed="6">♩</div>
            <div  aria-hidden  className="musicSign musicSign5 rellax"  data-rellax-speed="1">♪</div>
            <div  aria-hidden  className="musicSign musicSign6 rellax"  data-rellax-speed="2">♬</div>
        </div>
    )
}
export default RellaxDisplay;