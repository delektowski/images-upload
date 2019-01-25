import React from 'react';
import Button from '../../Shared/Button/Button';
import classes from './Reset.module.scss';
import firebase from 'firebase/app';
import 'firebase/database';

const Reset = (props) => {
	const resetUserSelection = () => {
		for (let value in props.imagesDataObj) {
			firebase.database().ref(`${props.userName}/images/${value}`).update({
				containerColor: '',
				isClickedBlue: false,
				isClickedGreen: false,
				isClickedRed: false
			});
		}
	};
	return (
		<div className={classes.Reset}>
			<Button clicked={resetUserSelection} buttonText="Reset" />
		</div>
	);
};

export default Reset;
