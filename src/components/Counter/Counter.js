import React from 'react';
import Button from '../Button/Button';
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

	const countPayPerImage = (howManySelected) => {
		console.log(howManySelected);
	};

	return (
		<React.Fragment>
			<div className={classes.Counter}>
				<p>TAK: {selectedElementsAmount('green')} </p>
				<p>MOŻE: {selectedElementsAmount('blue')}</p>
				<p>NIE: {selectedElementsAmount('red')}</p>
				<p>WSZYSTKIE: {selectedElementsAmount('wszystkie')}</p>
				<p>NIEZAZNACZONE: {selectedElementsAmount('niezaznaczone')}</p>
			</div>
			<div className={classes.Counter}>
				<div className={classes.Counter__section}>
					<p>Możesz wybrać 10 zdjęć. Każde kolejne kosztuje 5 zł</p>
				</div>
				<div className={classes.Counter__section}>
					<p>
						Pozostało do wyboru:{' '}
						<span style={{ color: 'blue' }}>{10 - selectedElementsAmount('green')} zdjęć</span>{' '}
					</p>
				</div>
				<div className={classes.Counter__section}>
					<p>
						Koszt dodatkowych zdjęć: {countPayPerImage(selectedElementsAmount('green'))}
						zł
					</p>
				</div>
				<Button buttonText="WYBIERZ WSZYSTKIE I ZAPŁAĆ 40 zł" buttonColor="Button__green" />
			</div>
		</React.Fragment>
	);
};

export default counter;
