import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = (theme) => ({
	container: {
		position: 'relative'
	},
	caption: {
		position: 'absolute',
		top: '50%',
		transform: 'translate(-110%, -50%)',
		fontSize: '.8rem',
		[theme.breakpoints.down('xs')]: {
			transform: 'translate(-80%, -50%)',
			fontSize: '.6rem'
		},
		[theme.breakpoints.down(400)]: {
			transform: 'translate(-60%, -50%)',
			fontSize: '.5rem'
		}
	},
	greenClicked: {
		color: 'green',
		'&$checked': {
			color: 'green'
		}
	},
	blueClicked: {
		color: 'rgb(158, 158, 158)',
		'&$checked': {
			color: 'rgb(158, 158, 158)'
		}
	},
	redClicked: {
		color: 'rgb(0,0,0)',
		'&$checked': {
			color: 'rgb(0,0,0)'
		}
	},

	orangeClicked: {
		color: 'rgb(255,87,34)',
		'&$checked': {
			color: 'rgb(255,87,34)'
		}
	},
	checked: {}
});

const filter = ({ filterClicked, filterButtonsState, classes }) => {
	console.count('FILTER');
	return (
		<div className={classes.container}>
			{filterClicked === 'greenClicked' ? (
				<Typography className={classes.caption} variant="caption">
					POKAŻ
				</Typography>
			) : null}
			<Checkbox
				checked={filterButtonsState[filterClicked]}
				classes={{
					root: classes[filterClicked],
					checked: classes.checked
				}}
			/>
		</div>
	);
};

filter.propTypes = {
	classes: PropTypes.object,
	filterButtonsState: PropTypes.object,
	filterClicked: PropTypes.string
};

export default withStyles(styles)(filter);
