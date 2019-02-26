import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';

const logout = ({ onLogoutHandler, userName }) => {
	const logoutHandler = () => {
		if (userName) {
			firebase.database().ref(userName).off();
		}
		firebase
			.auth()
			.signOut()
			.then(function() {
				console.log('Logout');
			})
			.catch(function(error) {
				console.log('Logout: ', error);
			});
		onLogoutHandler();
	};
	return (
		<Typography style={{ width: '100%' }} variant="overline" align="center" onClick={logoutHandler}>
			wyloguj
		</Typography>
	);
};

logout.propTypes = {
	onLogoutHandler: PropTypes.func,
	userName: PropTypes.string
};

export default logout;
