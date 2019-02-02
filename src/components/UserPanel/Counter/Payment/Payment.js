import React from 'react';
import { Paper, Typography, Avatar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	paper: {
		background: 'whitesmoke',
		marginTop: 30,
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
	white: {
		color: 'white'
	}
});

const Payment = (props) => {
	const { classes } = props;
	const imagesForFree = props.freePicturesAmount;
	const picturePrice = props.picturePrice;
	const countPayPerImage = (howManySelected) => {
		if (howManySelected > imagesForFree) {
			return (howManySelected - imagesForFree) * picturePrice;
		}
		return 0;
	};

	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				<div className={[ classes.iconCaptionContainer, classes.green ].join(' ')}>
					<div>
						<Typography className={[ classes.iconCaption, classes.green ].join(' ')} variant="caption">
							darmowe zdjęcia
						</Typography>
					</div>
					<Avatar className={[ classes.avatar, classes.bgGreen ].join(' ')}>
						<Typography className={classes.white} variant="caption">
							{imagesForFree - props.selectedGreenAmount > 0 ? (
								imagesForFree - props.selectedGreenAmount
							) : (
								0
							)}
						</Typography>
					</Avatar>
				</div>
				<div className={[ classes.iconCaptionContainer, classes.black ].join(' ')}>
					<div>
						<Typography className={[ classes.iconCaption, classes.black ].join(' ')} variant="caption">
							cena zdjęcia
						</Typography>
					</div>
					<Avatar className={[ classes.avatar, classes.bgBlack ].join(' ')}>
						<Typography className={classes.white} variant="caption">
							{picturePrice} zł
						</Typography>
					</Avatar>
				</div>
				<div
					className={[ classes.iconCaptionContainer, classes.iconCaptionContainerBig, classes.red ].join(' ')}
				>
					<Typography className={[ classes.iconCaption, classes.red ].join(' ')} variant="caption">
						koszt dodatkowych zdjęć
					</Typography>

					<Avatar className={[ classes.avatar, classes.bgRed ].join(' ')}>
						<Typography className={classes.white} variant="caption">
							{countPayPerImage(props.selectedGreenAmount)} zł
						</Typography>
					</Avatar>
				</div>
			</Paper>
			<Paper className={classes.paper} />
		</React.Fragment>
	);
};
export default withStyles(styles)(Payment);
