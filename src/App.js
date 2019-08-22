import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import firebase from "./components/Firebase.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faSignInAlt,
	faSignOutAlt,
	faPause,
	faPlay,
	faSave,
	faTrashAlt,
	faSearch,
	faClipboardList,
	faDumpster
} from "@fortawesome/free-solid-svg-icons";
import Nav from "./components/Nav.js";
import DisplayTracks from "./components/DisplayTracks.js";
import SongList from "./components/SongList.js";
import Footer from "./components/Footer.js";
import "./styles/styles.scss";
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

library.add(
	faSignInAlt,
	faSignOutAlt,
	faPause,
	faPlay,
	faSave,
	faTrashAlt,
	faSearch,
	faClipboardList,
	faDumpster
);
class App extends Component {
	constructor() {
		super();
		this.state = {
			user: null
		};
	}
	handleLogIn = () => {
		auth.signInWithPopup(provider).then(result => {
			const user = result.user;

			this.setState({
				user
			});
		});
	};
	handleLogOut = () => {
		auth.signOut().then(() => {
			this.setState({
				user: null
			});
		});
	};
	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
			}
		});
	}
	render() {
		return (
			<HashRouter>
				<Nav
					user={this.state.user}
					handleLogIn={this.handleLogIn}
					handleLogOut={this.handleLogOut}
				/>
				<Route
					exact
					path="/"
					render={() => {
						return <DisplayTracks user={this.state.user} />;
					}}
				/>
				<Route
					path="/songList"
					render={() => {
						return (
							<SongList
								uid={
									this.state.user ? this.state.user.uid : null
								}
							/>
						);
					}}
				/>
				<Footer />
			</HashRouter>
		);
	}
}

export default App;
