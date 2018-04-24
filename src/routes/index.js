import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../containers/Login';
import Home from '../containers/Home';
import Favourites from '../containers/Favourites';
import Details from '../containers/Details';
import Callback from '../components/Callback';
import Auth from '../utils/Auth';
import Profile from '../components/UserProfile/UserProfile';

class Routes extends Component {
	auth = new Auth();

	handleAuthentication = ({ location }) => {
		if (/access_token|id_token|error/.test(location.hash)) {
			this.auth.handleAuthentication();
		}
	};

	render() {
		return (
			<Switch>
				<Route path="/login" exact component={Login} />
				<Route
					path="/"
					exact
					render={props =>
						!this.auth.isAuthenticated() ? (
							<Redirect to="/login" />
						) : (
							<Home auth={this.auth} {...props} />
						)
					}
				/>
				<Route
					path="/favourites"
					render={props =>
						!this.auth.isAuthenticated() ? (
							<Redirect to="/login" />
						) : (
							<Favourites auth={this.auth} {...props} />
						)
					}
				/>
				<Route
					path="/details"
					render={props =>
						!this.auth.isAuthenticated() ? (
							<Redirect to="/login" />
						) : (
							<Details
								auth={this.auth}
								heroes={this.props.heroes}
								currentHero={this.props.currentHero}
								{...props}
							/>
						)
					}
				/>
				<Route
					path="/profile"
					render={props =>
						!this.auth.isAuthenticated() ? (
							<Redirect to="/login" />
						) : (
							<Profile auth={this.auth} {...props} />
						)
					}
				/>
				<Route
					path="/callback"
					render={props => {
						this.handleAuthentication(props);
						return <Callback {...props} />;
					}}
				/>
			</Switch>
		);
	}
}

export default Routes;
