import auth0 from 'auth0-js';
import history from './history';
import * as auth0Vars from './auth0Variables';

export default class Auth {
	auth0 = new auth0.WebAuth({
		domain: auth0Vars.AUTH0_DOMAIN,
		clientID: auth0Vars.AUTH0_CLIENT_ID,
		redirectUri: auth0Vars.AUTH0_REDIRECT_URI,
		audience: `https://${auth0Vars.AUTH0_DOMAIN}/userinfo`,
		responseType: 'token id_token',
		scope: 'openid profile'
	});

	userProfile = null;

	constructor() {
		this.login = this.login.bind(this);
		this.signup = this.signup.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.getProfile = this.getProfile.bind(this);
	}

	userProfile = {};

	login(username, password) {
		this.auth0.login(
			{ realm: auth0Vars.AUTH0_DB_CONNECTION_NAME, username, password },
			(err, authResult) => {
				if (err) {
					console.log(err);
					return;
				}
			}
		);
	}

	signup(email, password) {
		this.auth0.signup(
			{ connection: auth0Vars.AUTH0_DB_CONNECTION_NAME, email, password },
			err => {
				if (err) {
					console.log(err);
					return;
				}

				this.auth0.login(
					{
						realm: auth0Vars.AUTH0_DB_CONNECTION_NAME,
						username: email,
						password
					},
					(err, authResult) => {
						if (err) {
							console.log(err);
							return;
						}
					}
				);
			}
		);
	}

	handleAuthentication() {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
				history.replace('/');
			} else if (err) {
				history.replace('/login');
				console.log(err);
			}
		});
	}

	setSession(authResult) {
		// Set the time that the access token will expire at
		let expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		);
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
		// navigate to the home route
		history.replace('/');
	}

	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		this.userProfile = null;
		// navigate to the home route
		history.replace('/login');
	}

	isAuthenticated() {
		// Check whether the current time is past the
		// access token's expiry time
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		return new Date().getTime() < expiresAt;
	}

	getProfile(cb) {
		let accessToken = localStorage.getItem('access_token');
		this.auth0.client.userInfo(accessToken, (err, profile) => {
			if (profile) {
				this.userProfile = profile;
			}
			cb(err, profile);
		});
	}
}
