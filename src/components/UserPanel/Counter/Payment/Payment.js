import React from 'react';
import { Paper, Typography, Avatar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = (theme) => ({
	paper: {
		background: 'whitesmoke',
		// marginTop: '1%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 5,
		paddingBottom: 5,
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
	bgBlack: {
		background: 'black'
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
	}
});

const Payment = (props) => {
	const { classes } = props;
	const freePicturesAmount = props.freePicturesAmount;
	const amountAll = props.allSelectedAmount;
	const picturePrice = props.picturePrice;

	const countPayPerImage = (howManySelected) => {
		if (howManySelected > freePicturesAmount) {
			return (howManySelected - freePicturesAmount) * picturePrice;
		}
		return 0;
	};

	const allImagesCost = () => {
		const discount = (amountAll - freePicturesAmount) * picturePrice * (props.discountProcent / 100);
		let price = Math.round((amountAll - freePicturesAmount) * picturePrice - discount);
		if (price < 0) price = 0;
		return price;
	};

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
						{freePicturesAmount - props.selectedGreenAmount > 0 ? (
							freePicturesAmount - props.selectedGreenAmount
						) : (
							0
						)}
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
						{props.selectedGreenAmount}
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
				<div className={[ classes.iconCaptionContainer, classes.black ].join(' ')}>
					<div>
						<Typography className={[ classes.iconCaption, classes.black ].join(' ')} variant="caption">
							KOSZT WSZYSTKICH ZDJĘĆ
						</Typography>
					</div>
					<Avatar className={[ classes.avatar, classes.bgBlack ].join(' ')}>
						<Typography className={classes.white} variant="caption">
							{allImagesCost()} zł
						</Typography>
					</Avatar>
				</div>
				<div
					className={[ classes.iconCaptionContainer, classes.iconCaptionContainerBig, classes.red ].join(' ')}
				>
					<Typography className={[ classes.iconCaption, classes.red ].join(' ')} variant="caption">
						KOSZT DODATKOWYCH ZDJĘĆ <br /> <strong>{picturePrice} zł/szt.</strong>
					</Typography>

					<Avatar className={[ classes.avatar, classes.bgRed ].join(' ')}>
						<Typography className={classes.white} variant="caption">
							{countPayPerImage(props.selectedGreenAmount)} zł
						</Typography>
					</Avatar>
				</div>
			</Paper>
		</React.Fragment>
	);
};
export default withStyles(styles)(Payment);
