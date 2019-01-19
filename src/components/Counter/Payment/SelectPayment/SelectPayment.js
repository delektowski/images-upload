import React from 'react';
import Button from '../../../Button/Button';
import classes from './SelectPayment.module.scss';

const SelectPayment = (props) => {
	return (
		<div className={classes.SelectPayment}>
			<Button
				buttonText={`WSZYSTKIE koszt dodatkowy: ${props.allSelectedAmount * 5 * 0.4} zł`}
				buttonColor="Button__green"
			/>
			<Button buttonText={`TYLKO WYBRANE koszt dodatkowy: ${props.paymentPerImage} zł`} buttonColor="" />
		</div>
	);
};

export default SelectPayment;
