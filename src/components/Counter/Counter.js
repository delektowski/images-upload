import React from 'react';
import classes from './Counter.module.scss';

const counter = (props) => {
	const selectedElementsAmount = (elementColor) => {
		let amountOfElement = 0;
		switch (elementColor) {
			case 'green':
				for (let isClickedGreen in props.imagesDataObj) {
					if (props.imagesDataObj[isClickedGreen].isClickedGreen === true) amountOfElement++;
				}
				return amountOfElement;
			case 'blue':
				for (let isClickedBlue in props.imagesDataObj) {
					if (props.imagesDataObj[isClickedBlue].isClickedBlue === true) amountOfElement++;
				}
				return amountOfElement;

			case 'red':
				for (let isClickedRed in props.imagesDataObj) {
					if (props.imagesDataObj[isClickedRed].isClickedRed === true) amountOfElement++;
				}
				return amountOfElement;

			case 'wszystkie':
				for (let everyPicture in props.imagesDataObj) {
					if (everyPicture) amountOfElement++;
				}
				return amountOfElement;
			case 'niezaznaczone':
				return (
					selectedElementsAmount('wszystkie') -
					selectedElementsAmount('green') -
					selectedElementsAmount('blue') -
					selectedElementsAmount('red')
				);
			default:
				return null;
		}
	};

	selectedElementsAmount();
	return (
		<div className={classes.Counter}>
			<p>TAK: {selectedElementsAmount('green')} </p>
			<p>MOŻE: {selectedElementsAmount('blue')}</p>
			<p>NIE: {selectedElementsAmount('red')}</p>
			<p>WSZYSTKIE: {selectedElementsAmount('wszystkie')}</p>
			<p>NIEZAZNACZONE: {selectedElementsAmount('niezaznaczone')}</p>
		</div>
	);
};

export default counter;
