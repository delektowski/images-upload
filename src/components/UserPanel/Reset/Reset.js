import React from 'react';
import { Button } from '@material-ui/core/';
// import Button from '../../Shared/Button/Button';
import firebase from 'firebase/app';
import 'firebase/database';

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
		<Button variant="contained" color="primary" onClick={resetUserSelection} size="small">
			Reset
		</Button>
	);
};

export default Reset;
