import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Modal, Header, Button } from 'semantic-ui-react';
import * as actions from '../../store/actions/actions';
import Auth from '../../utils/Auth';
import { isEmpty } from '../../utils/helperMethods';
import classes from './UserProfile.css';

class UserProfile extends Component {
	state = {
		modalOpen: false
	};

	auth = new Auth();

	componentDidMount() {
		if (isEmpty(this.props.profile)) {
			this.getProfile();
		}
	}

	getProfile = () => {
		const { userProfile, getProfile } = this.auth;

		if (isEmpty(userProfile)) {
			getProfile((err, profile) => {
				this.props.onAddProfile(profile);
			});
		} else {
			this.props.onAddProfile(userProfile);
		}
	};

	logout = () => {
		this.auth.logout();
		this.setState({ modalOpen: false });
	};

	openModal = () => {
		this.setState({ modalOpen: true });
	};

	closeModal = () => {
		this.setState({ modalOpen: false });
	};

	render() {
		return (
			<div className={classes.Container}>
				<div
					className={classes.ImageContainer}
					onClick={this.openModal}>
					<Image circular src={this.props.profile.picture} />
				</div>
				<Modal
					dimmer="blurring"
					size="mini"
					open={this.state.modalOpen}
					onClose={this.closeModal}>
					<Modal.Header
						style={{
							background: 'rgb(197, 45, 70)',
							color: '#fff'
						}}>
						Profile Info
					</Modal.Header>
					<Modal.Content
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center'
						}}
						image>
						<Image
							wrapped
							size="small"
							circular
							src={this.props.profile.picture}
							style={{
								marginBottom: '50px'
							}}
						/>
						<Modal.Description style={{ width: '100%' }}>
							<Header>Profile Details:</Header>
							<p>
								<strong>e-mail:</strong>{' '}
								{this.props.profile.name}
							</p>
							<p>
								<strong>nickname:</strong>{' '}
								{this.props.profile.nickname}
							</p>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button
							floated="left"
							icon="close"
							labelPosition="left"
							content="Close"
							onClick={this.closeModal}
						/>
						<Button
							color="red"
							icon="sign out"
							labelPosition="right"
							onClick={this.logout}
							content="Logout"
						/>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}

UserProfile.propTypes = {
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddProfile: profile => dispatch(actions.addProfile(profile)),
		onRemoveProfile: profile => dispatch(actions.removeProfile(profile))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
