import React from 'react';
import { Button } from '@material-ui/core/';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
		<Button variant="contained" color="secondary" onClick={onLogoutHandler} size="small">
			Wyloguj
		</Button>
	);
};

export default logout;
