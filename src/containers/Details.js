import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Accordion, Card, Image, Icon, List, Grid } from 'semantic-ui-react';
import * as actionTypes from '../store/actions/actionTypes';
import { isEmpty } from '../utils/helperMethods';

class Details extends Component {
	state = {
		activeIndex: -1
	};

	componentDidMount() {
		if (!this.props.heroes.length) {
			this.props.history.push('/');
			return;
		}
	}

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
				{isEmpty(this.props.character) ||
				!this.props.heroes.length ? null : (
					<Fragment>
						<h2 style={{ margin: '50px 0' }}>
							{this.props.character.name}
						</h2>
						<Card
							raised
							centered
							style={{ marginBottom: '80px', width: '500px' }}>
							<Image
								src={
									this.props.character.thumbnail.path +
									'.' +
									this.props.character.thumbnail.extension
								}
							/>
							<Card.Content>
								<Card.Header>
									{this.props.character.name}
								</Card.Header>
								<Card.Description>
									{this.props.character.description}
								</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<Accordion>
									<Accordion.Title
										active={activeIndex === 0}
										index={0}
										onClick={this.handleClick}>
										<Icon name="dropdown" />
										Series with {this.props.character.name}:
									</Accordion.Title>
									<Accordion.Content
										active={activeIndex === 0}>
										<List>
											{this.props.character.series.items.map(
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
											<Card.Header>
												{character.name}
											</Card.Header>
											<Card.Description>
												{character.description}
											</Card.Description>
										</Card.Content>
										<Card.Content extra>
											<Accordion>
												<Accordion.Title
													active={
														activeIndex === i + 1
													}
													index={i + 1}
													onClick={this.handleClick}>
													<Icon name="dropdown" />
													Series with {
														character.name
													}:
												</Accordion.Title>
												<Accordion.Content
													active={
														activeIndex === i + 1
													}>
													<List>
														{character.series.items.map(
															(item, i) => (
																<List.Item
																	key={`series-item-${i}`}
																	icon="circle outline"
																	content={
																		item.name
																	}
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
					</Fragment>
				)}
			</div>
		);
	}
}

Details.propTypes = {
	heroes: PropTypes.array.isRequired,
	character: PropTypes.object
};

const mapStateToProps = state => {
	return {
		heroes: state.heroes,
		character: state.character
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onRemoveFromFavourites: id =>
			dispatch({ type: actionTypes.REMOVE_FROM_FAVOURITES, id })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
