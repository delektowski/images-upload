import React from 'react';
import { Paper, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	paper: {
		background: 'whitesmoke',
		marginTop: 65,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 5
	}
};

const checkout = (props) => {
	const { classes } = props;
	return (
		<div>
			<Paper className={classes.paper}>
				<h1>Checkout</h1>
			</Paper>
		</div>
	);
};

export default withStyles(styles)(checkout);
