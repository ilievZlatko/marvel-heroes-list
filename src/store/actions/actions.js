import axios from 'axios';
import CryptoJS from 'crypto-js';
import * as actionTypes from './actionTypes';
import urls from '../../urls';
import * as marvelVariables from '../../utils/marvelVariables';

const ts = new Date().getTime();
const hash = CryptoJS.MD5(
	ts + marvelVariables.PRIVATE_KEY + marvelVariables.PUBLIC_KEY
).toString();

export const addProfile = profile => {
	return {
		type: actionTypes.ADD_PROFILE,
		profile
	};
};

export const removeProfile = profile => {
	return {
		type: actionTypes.REMOVE_PROFILE,
		profile
	};
};

const mapNewHeroes = heroes => {
	return heroes.map(h => Object.assign({}, h, { favorite: false }));
};

export const addToFavourites = id => {
	return {
		type: actionTypes.ADD_TO_FAVOURITES,
		id
	};
};

export const removeFromFavourites = id => {
	return {
		type: actionTypes.REMOVE_FROM_FAVOURITES,
		id
	};
};

const editOffset = offset => {
	return {
		type: actionTypes.EDIT_OFFSET,
		offset: offset + 10
	};
};

const loadingHeroes = loading => {
	return {
		type: actionTypes.LOADING_HEROES,
		loading: loading
	};
};

export const mapHeroes = heroes => {
	return {
		type: actionTypes.MAP_HEROES,
		heroes: heroes
	};
};

export const getHeroes = offset => {
	return dispatch => {
		dispatch(loadingHeroes(true));
		axios
			.get(urls.getHeroes, {
				params: {
					ts: ts,
					apikey: marvelVariables.PUBLIC_KEY,
					hash: hash,
					offset: offset,
					limit: 10
				}
			})
			.then(response => {
				const heroes = mapNewHeroes(response.data.data.results);
				dispatch(editOffset(response.data.data.offset));
				dispatch(mapHeroes(heroes));
				dispatch(loadingHeroes(false));
			})
			.catch(error => {
				dispatch(loadingHeroes(false));
				console.log(error);
			});
	};
};
