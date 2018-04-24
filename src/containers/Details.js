import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { parseQueryString } from '../utils/helperMethods';
import { Accordion, Card, Image, Icon, List, Grid } from 'semantic-ui-react';
import * as actionTypes from '../store/actions/actionTypes';

class Details extends Component {
	state = {
		heroId: null,
		character: {
			...this.props.heroes[0]
		}
	};

	componentWillMount() {
		this.setState({ characters: this.props.heroes });
		if (this.props.location && this.props.location.search) {
			const id = parseInt(
				parseQueryString(this.props.location.search)['hero-id'],
				10
			);
			this.findCharacter(id);
		}
	}

	findCharacter = id => {
		const character = this.props.heroes.find(c => c.id === id);
		if (character) {
			this.setState({ character, heroId: id });
			return character;
		}
	};

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	render() {
		const { activeIndex } = this.state;
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h2 style={{ margin: '50px 0' }}>
					{this.state.character.name}
				</h2>
				<Card
					raised
					centered
					style={{ marginBottom: '80px', width: '500px' }}>
					<Image
						src={
							this.state.character.thumbnail.path +
							'.' +
							this.state.character.thumbnail.extension
						}
					/>
					<Card.Content>
						<Card.Header>{this.state.character.name}</Card.Header>
						<Card.Description>
							{this.state.character.description}
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Accordion>
							<Accordion.Title
								active={activeIndex === 0}
								index={0}
								onClick={this.handleClick}>
								<Icon name="dropdown" />
								Series with {this.state.character.name}:
							</Accordion.Title>
							<Accordion.Content active={activeIndex === 0}>
								<List>
									{this.state.character.series.items.map(
										(item, i) => (
											<List.Item
												key={`series-item-${i}`}
												icon="circle outline"
												content={item.name}
											/>
										)
									)}
								</List>
							</Accordion.Content>
						</Accordion>
					</Card.Content>
				</Card>
				<Grid columns={4}>
					{this.props.heroes.map((character, i) => (
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
									<Accordion>
										<Accordion.Title
											active={activeIndex === i + 1}
											index={i + 1}
											onClick={this.handleClick}>
											<Icon name="dropdown" />
											Series with {character.name}:
										</Accordion.Title>
										<Accordion.Content
											active={activeIndex === i + 1}>
											<List>
												{character.series.items.map(
													(item, i) => (
														<List.Item
															key={`series-item-${i}`}
															icon="circle outline"
															content={item.name}
														/>
													)
												)}
											</List>
										</Accordion.Content>
									</Accordion>
								</Card.Content>
							</Card>
						</Grid.Column>
					))}
				</Grid>
			</div>
		);
	}
}

Details.propTypes = {
	heroes: PropTypes.array.isRequired,
	heroId: PropTypes.number,
	character: PropTypes.object
};

const mapStateToProps = state => {
	return {
		heroes: state.heroes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onRemoveFromFavourites: id =>
			dispatch({ type: actionTypes.REMOVE_FROM_FAVOURITES, id })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
