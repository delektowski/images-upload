import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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

const filter = (props) => {
	console.count('FILTER');
	const { classes } = props;

	const buttonClickHandler = (whichButton) => {
		switch (whichButton) {
			case 'greenClicked':
				props.onFilterButtonsState('greenClicked');
				break;

			case 'blueClicked':
				props.onFilterButtonsState('blueClicked');
				break;

			case 'redClicked':
				props.onFilterButtonsState('redClicked');
				break;

			case 'orangeClicked':
				props.onFilterButtonsState('orangeClicked');
				break;

			default:
				break;
		}
	};

	return (
		<div className={classes.container}>
			{props.filterClicked === 'greenClicked' ? (
				<Typography className={classes.caption} variant="caption">
					POKAŻ
				</Typography>
			) : null}
			<Checkbox
				checked={props.filterButtonsState[props.filterClicked]}
				onChange={() => buttonClickHandler(props.filterClicked)}
				classes={{
					root: classes[props.filterClicked],
					checked: classes.checked
				}}
			/>
		</div>
	);
};

export default withStyles(styles)(filter);
