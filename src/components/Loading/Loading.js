import React from 'react';
import loadingImage from '../../assets/images/loading.svg';

const Loading = props => {
	const style = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '150px',
		width: '100vw',
		backgroundColor: 'white'
	};

	return (
		<div style={style}>
			<img src={loadingImage} alt="loading" />
		</div>
	);
};

export default Loading;
