import React from 'react';
import { Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';

const selection = ({ onCheckoutClose, onMenuClose }) => {
	console.count('SELECTION');

	const onSelectionHandler = () => {
		onCheckoutClose();
		onMenuClose();
	};

	return (
		<Typography style={{ width: '100%' }} variant="overline" align="center" onClick={onSelectionHandler}>
			selekcja
		</Typography>
	);
};

selection.propTypes = {
	onCheckoutClose: PropTypes.func,
	onMenuClose: PropTypes.func
};

export default selection;
