import React from 'react';
import Loading from './Loading/Loading';

const Callback = props => {
	const style = {
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		width: '100vw',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'white'
	};
	return <Loading style={style} />;
};

export default Callback;
