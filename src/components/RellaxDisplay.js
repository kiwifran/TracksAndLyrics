import React from "react";
//show scrolling music signs in the header with rellax.js
function RellaxDisplay() {
	return (
		<div aira-hidden="true" className="rellaxWrapper">
			<div
				aria-hidden="true"
				className="musicSign musicSign1 rellax"
				data-rellax-speed="1"
			>
				♫
			</div>
			<div
				aria-hidden="true"
				className="musicSign musicSign2 rellax"
				data-rellax-speed="3"
			>
				♩
			</div>
			<div
				aria-hidden="true"
				className="musicSign musicSign3 rellax"
				data-rellax-speed="3"
			>
				♬
			</div>
			<div
				aria-hidden="true"
				className="musicSign musicSign4 rellax"
				data-rellax-speed="3"
			>
				♪
			</div>
			<div
				aria-hidden="true"
				className="musicSign musicSign5 rellax"
				data-rellax-speed="1"
			>
				♪
			</div>
			<div
				aria-hidden="true"
				className="musicSign musicSign6 rellax"
				data-rellax-speed="2.5"
			>
				♫
			</div>
		</div>
	);
}
export default RellaxDisplay;
