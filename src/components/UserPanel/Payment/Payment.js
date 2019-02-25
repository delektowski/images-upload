import React from 'react';
import { Paper, Typography, Avatar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import PropTypes from 'prop-types';

const styles = (theme) => ({
	paper: {
		background: 'whitesmoke',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		paddingLeft: 5,
		paddingRight: 5,
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	},
	iconCaption: {
		fontSize: '.56rem'
	},
	iconCaptionContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 90
	},
	iconCaptionContainerBig: {
		width: 110
	},
	avatar: {
		height: 40,
		width: 40,
		marginLeft: 5
	},
	green: {
		color: 'green'
	},
	bgGreen: {
		background: 'green'
	},
	red: {
		color: 'rgb(245, 0, 87)'
	},
	bgRed: {
		background: 'rgb(245, 0, 87)'
	},
	bgPrimary: {
		background: 'rgb(48, 63, 159)'
	},
	blue: {
		color: 'rgb(63, 81, 181)'
	},
	bgBlue: {
		background: 'rgb(63, 81, 181)'
	},
	deepPurple: {
		color: deepPurple[500]
	},
	bgDeepPurple: {
		background: deepPurple[500]
	},
	white: {
		color: 'white'
	},
	primary: {
		color: 'rgb(48, 63, 159)'
	}
});

const Payment = (props) => {
	console.count('PAYMENT');
	const { classes } = props;
	let selectionPayment = null;
	let checkoutPayment = null;

	if (!props.isCheckout) {
		selectionPayment = (
			<div className={[ classes.iconCaptionContainer, classes.deepPurple ].join(' ')}>
				<div>
					<Typography className={[ classes.iconCaption, classes.deepPurple ].join(' ')} variant="caption">
						DARMOWE ZDJĘCIA
					</Typography>
				</div>
				<Avatar className={[ classes.avatar, classes.bgDeepPurple ].join(' ')}>
					<Typography className={classes.white} variant="caption">
						{props.countFreePictures}
					</Typography>
				</Avatar>
			</div>
		);
	}

	if (props.isCheckout) {
		checkoutPayment = (
			<div className={[ classes.iconCaptionContainer, classes.green ].join(' ')}>
				<div>
					<Typography className={[ classes.iconCaption, classes.green ].join(' ')} variant="caption">
						WYBRANE ZDJĘCIA
					</Typography>
				</div>
				<Avatar className={[ classes.avatar, classes.bgGreen ].join(' ')}>
					<Typography className={classes.white} variant="caption">
						{props.selectedImages}
					</Typography>
				</Avatar>
			</div>
		);
	}

	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				{selectionPayment}
				{checkoutPayment}
				<div className={[ classes.iconCaptionContainer, classes.primary ].join(' ')}>
					<div>
						<Typography className={[ classes.iconCaption, classes.primary ].join(' ')} variant="caption">
							KOSZT WSZYSTKICH ZDJĘĆ
						</Typography>
					</div>
					<Avatar className={[ classes.avatar, classes.bgPrimary ].join(' ')}>
						<Typography className={classes.white} variant="caption">
							{props.allImagesCost} zł
						</Typography>
					</Avatar>
				</div>
				<div
					className={[ classes.iconCaptionContainer, classes.iconCaptionContainerBig, classes.red ].join(' ')}
				>
					<Typography className={[ classes.iconCaption, classes.red ].join(' ')} variant="caption">
						KOSZT DODATKOWYCH ZDJĘĆ <br /> <strong>{props.picturePrice} zł/szt.</strong>
					</Typography>

					<Avatar className={[ classes.avatar, classes.bgRed ].join(' ')}>
						<Typography className={classes.white} variant="caption">
							{props.countPayPerImage} zł
						</Typography>
					</Avatar>
				</div>
			</Paper>
		</React.Fragment>
	);
};

Payment.propTypes = {
	classes: PropTypes.object,
	allImagesCost: PropTypes.number,
	countFreePictures: PropTypes.number,
	countPayPerImage: PropTypes.number,
	isCheckout: PropTypes.bool,
	picturePrice: PropTypes.string,
	selectedImages: PropTypes.number
};

export default withStyles(styles)(Payment);
