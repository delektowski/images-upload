import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Typography } from '@material-ui/core/';

const logout = (props) => {
	const onLogoutHandler = () => {
		if (props.userName) {
			firebase.database().ref(props.userName).off();
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
		props.onLogoutHandler();
	};
	return (
		<Typography style={{ width: '100%' }} variant="overline" align="center" onClick={onLogoutHandler}>
			wyloguj
		</Typography>
	);
};

export default logout;
