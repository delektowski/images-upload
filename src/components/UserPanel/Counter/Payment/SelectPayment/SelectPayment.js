import React from 'react';
import Button from '../../../../Shared/Button/Button';
import classes from './SelectPayment.module.scss';

const SelectPayment = (props) => {
	return (
		<div className={classes.SelectPayment}>
			<div className={classes.SelectPayment__buttonContainer}>
				<Button buttonText="WSZYSTKIE" buttonColor="Button__green" />
				<p className={classes.SelectPayment__buttonSubText}>
					Koszt dodatkowy:
					<span className={classes.SelectPayment__buttonSubTextVar}>{` ${props.allSelectedAmount *
						5 *
						0.4} zł`}</span>{' '}
				</p>
			</div>
			<div className={classes.SelectPayment__buttonContainer}>
				<Button buttonText="TYLKO WYBRANE" buttonColor="" />
				<p className={classes.SelectPayment__buttonSubText}>
					Koszt dodatkowy:
					<span
						className={classes.SelectPayment__buttonSubTextVar}
					>{` ${props.paymentPerImage} zł`}</span>{' '}
				</p>
			</div>
		</div>
	);
};

export default SelectPayment;
