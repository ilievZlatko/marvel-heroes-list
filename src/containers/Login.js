import React, { Component } from 'react';
import { Card, Button, Form, Image } from 'semantic-ui-react';
import Auth from '../utils/Auth';
import Logo from '../assets/images/MarvelLogo.png';

class Login extends Component {
	state = {
		showSignIn: true,
		email: '',
		password: '',
		confirmPassword: ''
	};

	switchToSignUp = () => {
		this.setState({ showSignIn: true });
	};

	switchToSignIn = () => {
		this.setState({ showSignIn: false });
	};

	handleSignIn = () => {
		const auth0 = new Auth();
		auth0.login(this.state.email, this.state.password);
	};

	handleSignUp = () => {
		const auth0 = new Auth();
		auth0.signup(this.state.email, this.state.password);
	};

	handleEmailChange = e => {
		this.setState({ email: e.target.value });
	};

	handlePasswordChange = e => {
		this.setState({ password: e.target.value });
	};

	handleConfirmPassword = e => {
		this.setState({ confirmPassword: e.target.value });
	};

	validationCheck = () => {
		const email = this.state.email.trim();
		const password = this.state.password.trim();
		const confirmPassword = this.state.confirmPassword.trim();

		if (this.state.showSignIn) {
			if (email && password && password.length >= 8) {
				return true;
			} else {
				return false;
			}
		} else {
			if (
				email &&
				password &&
				password.length >= 8 &&
				password === confirmPassword
			) {
				return true;
			} else {
				return false;
			}
		}
	};

	render() {
		return (
			<div
				style={{
					position: 'absolute',
					top: '0',
					left: '0',
					right: '0',
					bottom: '0',
					display: 'flex',
					alignItems: 'center',
					background:
						'radial-gradient(ellipse at center, #65160a 0%,#3c0c04 100%)',
					backgroundSize: 'cover',
					zIndex: '9999'
				}}>
				<Card centered raised style={{ minWidth: '400px' }}>
					<Image src={Logo} />
					<Card.Content>
						<Card.Header
							style={{
								color: '#b7b7b7',
								margin: '15px 0'
							}}>
							{this.state.showSignIn
								? 'Log In'
								: 'Create profile'}
						</Card.Header>
						<Card.Meta>
							<Form>
								<Form.Field
									label="Email"
									control="input"
									type="email"
									required
									placeholder="Your Email"
									value={this.state.email}
									onChange={this.handleEmailChange}
								/>
								<Form.Field
									label="Password"
									control="input"
									type="password"
									required
									placeholder="Your Password"
									value={this.state.password}
									onChange={this.handlePasswordChange}
								/>
								{this.state.showSignIn ? (
									<div>
										<Button
											color="blue"
											type="submit"
											disabled={!this.validationCheck()}
											onClick={this.handleSignIn}>
											SUBMIT
										</Button>
										<Button
											color="red"
											type="button"
											onClick={this.switchToSignIn}>
											SIGN UP
										</Button>
									</div>
								) : (
									<div>
										<Form.Field
											label="Confirm Password"
											error={
												this.state.confirmPassword
													.length > 0 &&
												!this.validationCheck()
											}
											required
											control="input"
											type="password"
											placeholder="Confirm Password"
											value={this.state.confirmPassword}
											onChange={
												this.handleConfirmPassword
											}
										/>
										<Button
											color="blue"
											type="submit"
											disabled={!this.validationCheck()}
											onClick={this.handleSignUp}>
											SUBMIT
										</Button>
										<Button
											color="red"
											type="button"
											onClick={this.switchToSignUp}>
											SIGN IN
										</Button>
									</div>
								)}
							</Form>
						</Card.Meta>
					</Card.Content>
				</Card>
			</div>
		);
	}
}

export default Login;
