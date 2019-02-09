import React from 'react';
import { Typography } from '@material-ui/core/';

const checkoutRelease = (props) => {
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

export default checkoutRelease;
