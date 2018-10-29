import React, { Fragment } from 'react';
import { Header, Container } from 'semantic-ui-react';
import Nav from '../components/Nav/Nav';
import UserProfile from '../components/UserProfile/UserProfile';

const layout = props => {
	return (
		<Fragment>
			<Header
				style={{
					background: '#c52d46',
					position: 'fixed',
					justifyContent: 'space-between',
					top: '0',
					left: '0',
					right: '0',
					zIndex: '9998',
					display: 'flex',
					boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
				}}>
				<Nav />
				{localStorage.getItem('access_token') ? <UserProfile /> : null}
			</Header>
			<Container fluid style={{ marginTop: '65px', padding: '0 5%' }}>
				{props.children}
			</Container>
		</Fragment>
	);
};

export default layout;
