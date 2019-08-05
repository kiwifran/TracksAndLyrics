import React from "react";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav(props) {
    return (
		<nav>
			<ul className="linkList wrapper">
				<li
					className="link "
				>
					{props.user ? (
						<button  className="logLink" onClick={props.handleLogOut}><FontAwesomeIcon icon="sign-out-alt" />Log Out</button>
					) : (
						<button className="logLink" onClick={props.handleLogIn}><FontAwesomeIcon icon="sign-in-alt" />Log In</button>
					)}
				</li>
				<li className="link">
					<NavLink to="/" className="navLink">
						<FontAwesomeIcon icon="search" />Search
					</NavLink>
				</li>
				<li className="link">
					<NavLink to="/songList" className="navLink">
						<FontAwesomeIcon icon="clipboard-list" />Song List
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
export default Nav;