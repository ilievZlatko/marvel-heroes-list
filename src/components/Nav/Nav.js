import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Nav.css';

const Nav = () => (
	<ul className={classes.nav}>
		<li>
			<NavLink exact activeClassName={classes.active} to="/">
				Summary
			</NavLink>
		</li>
		<li>
			<NavLink activeClassName={classes.active} to="/favourites">
				Favourites
			</NavLink>
		</li>
	</ul>
);

export default Nav;
