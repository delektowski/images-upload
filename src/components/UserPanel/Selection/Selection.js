import React from 'react';
import { Typography } from '@material-ui/core/';

const selection = (props) => {
	console.count('SELECTION');

	const onSelectionHandler = () => {
		props.onCheckoutClose();
		props.onMenuClose();
	};

	return (
		<Typography style={{ width: '100%' }} variant="overline" align="center" onClick={onSelectionHandler}>
			selekcja
		</Typography>
	);
};

export default selection;
