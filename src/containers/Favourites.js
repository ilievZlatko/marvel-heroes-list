import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Aux from '../HOC/Aux';
import { Search, Button, Grid, Card, Image } from 'semantic-ui-react';
import classes from './Favourites.css';
import * as actions from '../store/actions/actions';

class Favourites extends Component {
	previewDetails = character => {
		const queryString = `?hero-id=${character.id}`;
		this.props.history.push({
			pathname: '/details',
			search: queryString
		});
	};

	render() {
		return (
			<Aux>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
					<h2 style={{ margin: '50px 0' }}>Marvel Characters</h2>
					<Search
						className={classes.SearchField}
						placeholder="Filter by name or description"
						onSearchChange={e =>
							this.props.onFilterFavourites(e.target.value)
						}
						showNoResults={false}
					/>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<Grid columns={4}>
						{this.props.favourites.map(character => (
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
										<Card.Header>
											{character.name}
										</Card.Header>
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
									</Card.Content>
								</Card>
							</Grid.Column>
						))}
					</Grid>
				</div>
			</Aux>
		);
	}
}

Favourites.propTypes = {
	favourites: PropTypes.array.isRequired
};

const mapStateToProps = state => {
	return {
		favourites: state.favourites
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onRemoveFromFavourites: id =>
			dispatch(actions.removeFromFavourites(id)),
		onFilterFavourites: searchText =>
			dispatch({ type: 'FILTER_FAVOURITES', searchText })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
