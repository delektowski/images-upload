import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
	return (
		<button
			disabled={props.isButtonDisabled}
			onClick={props.clicked}
			className={[ classes.Button, classes[props.buttonColor] ].join(' ')}
			data-value={props.dataValue}
		>
			{props.buttonText}
			{/* <span className={classes[props.buttonTextStyle]}>{props.buttonText}</span> */}
		</button>
	);
};

export default Button;
