import * as actionTypes from '../actions/actionTypes';

const initialState = {
	profile: {},
	heroes: [],
	favourites: [],
	character: {},
	offset: 0,
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_PROFILE:
			return {
				...state,
				profile: action.profile
			};

		case actionTypes.REMOVE_PROFILE:
			return {
				...state,
				profile: action.profile
			};

		case actionTypes.MAP_HEROES:
			return {
				...state,
				heroes: [...state.heroes, ...action.heroes]
			};

		case actionTypes.LOADING_HEROES:
			return {
				...state,
				loading: action.loading
			};

		case actionTypes.EDIT_OFFSET:
			return {
				...state,
				offset: action.offset
			};

		case actionTypes.ADD_TO_FAVOURITES: {
			const newHeroes = state.heroes.map(
				hero =>
					hero.id === action.id ? { ...hero, favourite: true } : hero
			);

			return {
				...state,
				heroes: newHeroes,
				favourites: newHeroes.filter(h => h.favourite)
			};
		}

		case actionTypes.REMOVE_FROM_FAVOURITES: {
			const newHeroes = state.heroes.map(
				hero =>
					hero.id === action.id ? { ...hero, favourite: false } : hero
			);
			return {
				...state,
				heroes: newHeroes,
				favourites: newHeroes.filter(h => h.favourite)
			};
		}

		case actionTypes.FILTER_FAVOURITES: {
			const newFilteredFavourites = state.heroes
				.filter(h => h.favourite)
				.filter(
					favourite =>
						favourite.name
							.toLowerCase()
							.includes(action.searchText.toLowerCase()) ||
						favourite.description
							.toLowerCase()
							.includes(action.searchText.toLowerCase())
				);
			return {
				...state,
				favourites: newFilteredFavourites
			};
		}

		case actionTypes.GET_CURRENT_HERO:
			return {
				...state,
				character: action.character
			};

		default:
			return state;
	}
};

export default reducer;
