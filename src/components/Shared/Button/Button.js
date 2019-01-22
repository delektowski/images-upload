import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
	return (
		<button
			disabled={props.buttonIsDisabled}
			onClick={props.clicked}
			className={[ classes.Button, classes[props.buttonColor] ].join(' ')}
		>
			<span className={classes[props.buttonTextStyle]}>{props.buttonText}</span>
		</button>
	);
};

export default Button;
