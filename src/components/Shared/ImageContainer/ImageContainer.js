import React from 'react';
import classes from './ImageContainer.module.scss';

const imageContainer = (props) => {
	return (
		<div
			className={[
				classes.ImageContainer,
				props.containerColor === 'green' ? classes.ImageContainer__green : null,
				props.containerColor === 'blue' ? classes.ImageContainer__blue : null,
				props.containerColor === 'red' ? classes.ImageContainer__red : null,
				props.containerLarge ? classes.ImageContainer__large : null
			].join(' ')}
		>
			{props.children}
		</div>
	);
};

export default imageContainer;
