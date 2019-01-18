import React from 'react';
import Button from '../Button/Button';
import classes from './Filter.module.scss';

const Filter = (props) => {
	return (
		<div className={classes.Filter}>
			<Button buttonText="tak" buttonColor="Button__green" />
			<Button buttonText="może" buttonColor="Button__blue" />
			<Button buttonText="nie" buttonColor="Button__red" />
			<Button buttonText="wszystkie" buttonColor="" />
			<Button buttonText="nie wybrane" buttonColor="" />
		</div>
	);
};

export default Filter;
