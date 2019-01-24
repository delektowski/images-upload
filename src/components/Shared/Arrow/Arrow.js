import React from 'react';
import classes from './Arrow.module.scss';

const arrow = (props) => {
	return (
		<div
			onClick={props.clicked}
			data-direction={props.direction}
			className={props.direction === 'left' ? classes.Arrow__left : classes.Arrow__right}
		>
			<div className={props.direction === 'left' ? classes.Arrow__left_Top : classes.Arrow__right_Top} />
			<div className={props.direction === 'left' ? classes.Arrow__left_Bottom : classes.Arrow__right_Bottom} />
		</div>
	);
};

export default arrow;
