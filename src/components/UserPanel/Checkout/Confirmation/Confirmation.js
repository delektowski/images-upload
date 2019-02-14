import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

const confirmation = (props) => {
	const { classes } = props;

	return (
		<Dialog open={props.open} maxWidth="xs">
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

export default withStyles(styles)(confirmation);
