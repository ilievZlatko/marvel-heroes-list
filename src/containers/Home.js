import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Grid, Card, Image } from 'semantic-ui-react';
import * as actions from '../store/actions/actions';
import Loading from '../components/Loading/Loading';

class Home extends Component {
	previewDetails = character => {
		const queryString = `?hero-id=${character.id}`;
		this.props.history.push({
			pathname: '/details',
			search: queryString
		});
	};

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		if (this.props.heroes.length > 0) return;
		this.props.getHeroes(this.props.offset);
	}

	handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			if (this.props.loading) return;
			this.props.getHeroes(this.props.offset);
		}
	};

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h2 style={{ margin: '50px 0' }}>Marvel Characters</h2>
				<Grid columns={4}>
					{this.props.heroes.map(character => (
						<Grid.Column stretched key={character.id}>
							<Card raised fluid>
								<Image
									src={
										character.thumbnail.path +
										'.' +
										character.thumbnail.extension
									}
								/>
								<Card.Content>
									<Card.Header>{character.name}</Card.Header>
									<Card.Description>
										{character.description}
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<Button
										style={{ fontSize: '10px' }}
										onClick={() =>
											this.previewDetails(character)
										}>
										DETAILS
									</Button>
									{character.favourite ? (
										<Button
											color="red"
											floated="right"
											style={{ fontSize: '10px' }}
											onClick={() =>
												this.props.onRemoveFromFavourites(
													character.id
												)
											}>
											REMOVE FAVOURITE
										</Button>
									) : (
										<Button
											color="blue"
											floated="right"
											style={{ fontSize: '10px' }}
											onClick={() =>
												this.props.onAddToFavourites(
													character.id
												)
											}>
											ADD TO FAVOURITES
										</Button>
									)}
								</Card.Content>
							</Card>
						</Grid.Column>
					))}
				</Grid>
				{this.props.loading ? <Loading /> : null}
			</div>
		);
	}
}

Home.propTypes = {
	heroes: PropTypes.array.isRequired,
	offset: PropTypes.number.isRequired,
	heroesCount: PropTypes.number,
	loading: PropTypes.bool
};

const mapStateToProps = state => {
	return {
		heroes: state.heroes,
		offset: state.offset,
		heroesCount: state.heroesCount,
		loading: state.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddToFavourites: id => dispatch(actions.addToFavourites(id)),
		onRemoveFromFavourites: id =>
			dispatch(actions.removeFromFavourites(id)),
		getHeroes: offset => dispatch(actions.getHeroes(offset))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
