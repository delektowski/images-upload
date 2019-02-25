import React from 'react';
import { Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';

const checkoutRelease = (props) => {
	console.count('CHECKOUTRELEASE');
	const onCheckoutRelease = () => {
		props.onCheckoutRelease();
		props.onMenuClose();
	};

	return (
		<Typography style={{ width: '100%' }} variant="overline" align="center" onClick={onCheckoutRelease}>
			podsumowanie
		</Typography>
	);
};

checkoutRelease.propTypes = {
	onCheckoutRelease: PropTypes.func,
	onMenuClose: PropTypes.func
};

export default checkoutRelease;
