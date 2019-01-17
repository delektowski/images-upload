import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
	return (
		<button
			disabled={props.buttonIsDisabled}
			onClick={props.clicked}
			className={[ classes.Button, classes[props.buttonColor] ].join(' ')}
		>
			{props.buttonText}
		</button>
	);
};

export default Button;
