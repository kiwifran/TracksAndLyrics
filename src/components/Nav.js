import React from "react";
import {NavLink} from "react-router-dom";

function Nav(props) {
    return (
		<nav className="wrapper">
			<h1 className="logo">♫</h1>
			<ul className="linkList">
				<li
					className="link "
				>
					{props.user ? (
						<button  className="logLink" onClick={props.handleLogOut}>Log out</button>
					) : (
						<button className="logLink" onClick={props.handleLogIn}>log in</button>
					)}
				</li>
				<li className="link">
					<NavLink to="/" className="navLink">
						Search
					</NavLink>
				</li>
				<li className="link">
					<NavLink to="/songList" className="navLink">
						SongList
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
export default Nav;