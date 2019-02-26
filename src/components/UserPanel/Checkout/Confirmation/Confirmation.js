import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = {
	container: {
		padding: '5% 10%',
		textAlign: 'center'
	},
	button: {
		marginTop: '4%'
	},
	link: {
		textDecoration: 'none'
	}
};

const confirmation = ({ classes, open }) => {
	console.count('CONFIRMATION');

	return (
		<Dialog open={open} maxWidth="xs">
			<div className={classes.container}>
				<Typography variant="overline">Informacja o wyborze została wysłana do fotografa</Typography>
				<Typography variant="overline">Dziękuję! :-)</Typography>
				<Link
					className={classes.link}
					to={{
						pathname: '/'
					}}
				>
					<Button fullWidth variant="contained" color="primary" className={classes.button}>
						Zaloguj się ponownie
					</Button>
				</Link>
			</div>
		</Dialog>
	);
};

confirmation.propTypes = {
	classes: PropTypes.object,
	open: PropTypes.bool
};

export default withStyles(styles)(confirmation);
