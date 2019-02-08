import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Typography } from '@material-ui/core/';

const Reset = (props) => {
	const resetUserSelection = () => {
		for (let value in props.imagesDataObj) {
			firebase.database().ref(`${props.userName}/images/${value}`).update({
				containerColor: '',
				isClickedBlue: false,
				isClickedGreen: false,
				isClickedRed: true
			});
		}
	};
	return (
		<Typography style={{ width: '100%' }} variant="overline" align="center" onClick={resetUserSelection}>
			RESET
		</Typography>
	);
};

export default Reset;
