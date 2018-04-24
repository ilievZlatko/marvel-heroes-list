import React, { Component } from 'react';
import Layout from './HOC/Layout';
import Routes from './routes';
import './index.css';

class App extends Component {
	state = {
		currentHero: {}
	};

	render() {
		return (
			<Layout props={this.props}>
				<Routes currentHero={this.state.currentHero} />
			</Layout>
		);
	}
}

export default App;
