import React from 'react';

import classes from './Spinner.module.css';

const spinner = (props) => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: '100'
	};

	return props.show ? (
		<div style={style}>
			<div className={classes.Spinner}>
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	) : null;
};

export default spinner;
