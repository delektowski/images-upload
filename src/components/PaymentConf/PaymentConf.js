import React from 'react';
import { Fade, AppBar, Toolbar, TextField, InputAdornment, Paper, Avatar, Typography } from '@material-ui/core/';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import 'firebase/database';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
	bar: {
		marginTop: '1%'
	},
	bar__onUserCreated: {
		marginTop: 40
	},
	toolBar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'whitesmoke',
		paddingTop: 10,
		paddingBottom: 10
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		padding: 0,
		[theme.breakpoints.down('xs')]: {
			paddingTop: 10
		}
	},
	paper: {
		background: 'whitesmoke',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '2%',
		paddingBottom: '.8%',
		paddingTop: '.8%'
	},
	orangeAvatar: {
		width: 70,
		height: 70,
		margin: '0 auto',
		fontSize: '.9rem',
		color: '#fff',
		backgroundColor: deepOrange[500]
	},
	purpleAvatar: {
		width: 70,
		height: 70,
		margin: '0 auto',
		fontSize: '.9rem',
		color: '#fff',
		backgroundColor: deepPurple[500]
	},
	avatarContainer: {
		marginLeft: '5%',
		marginRight: '5%'
	}
});

const paymentConf = ({
	classes,
	amountSelectedImages,
	changeDiscountValue,
	changeFreePicturesAmount,
	changePicturePrice,
	discountProcent,
	freePicturesAmount,
	isUserCreated,
	picturePrice
}) => {
	console.count('PAYMENTCONF');
	let picturesAmount = amountSelectedImages ? amountSelectedImages.length : 0;
	let discount = (picturesAmount - freePicturesAmount) * picturePrice * (discountProcent / 100);
	let price = Math.round((picturesAmount - freePicturesAmount) * picturePrice - discount);
	if (price < 0) price = 0;
	console.log('PAYMENTCONssssssssssssssssssF', amountSelectedImages);
	return (
		<React.Fragment>
			<Fade in={true} timeout={500}>
				<AppBar position="static" className={isUserCreated ? classes.bar__onUserCreated : classes.bar}>
					<Toolbar className={classes.toolBar}>
						<form className={classes.container} noValidate autoComplete="off">
							<TextField
								disabled={!isUserCreated}
								className={classes.textField}
								variant="outlined"
								type="number"
								label="Darmowe zdjęcia"
								margin="dense"
								value={freePicturesAmount}
								onChange={(e) => changeFreePicturesAmount(e.target.value)}
								InputProps={{
									endAdornment: <InputAdornment position="end">szt.</InputAdornment>
								}}
							/>
						</form>
						<form className={classes.container} noValidate autoComplete="off">
							<TextField
								disabled={!isUserCreated}
								className={classes.textField}
								variant="outlined"
								type="number"
								label="Upust za wszystkie"
								margin="dense"
								value={discountProcent}
								onChange={(e) => changeDiscountValue(e.target.value)}
								InputProps={{
									endAdornment: <InputAdornment position="end">%</InputAdornment>
								}}
							/>
						</form>
						<form className={classes.container} noValidate autoComplete="off">
							<TextField
								disabled={!isUserCreated}
								className={classes.textField}
								variant="outlined"
								type="number"
								label="Cena za zdjęcie"
								margin="dense"
								value={picturePrice}
								onChange={(e) => changePicturePrice(e.target.value)}
								InputProps={{
									endAdornment: <InputAdornment position="end">zł</InputAdornment>
								}}
							/>
						</form>
					</Toolbar>
				</AppBar>
			</Fade>
			{isUserCreated ? (
				<Fade in={isUserCreated} timeout={500}>
					<Paper className={classes.paper}>
						<div className={classes.avatarContainer}>
							<Typography gutterBottom={true} variant="caption">
								Liczba zdjęć
							</Typography>
							<Avatar className={classes.orangeAvatar}>{picturesAmount}</Avatar>
						</div>
						<div className={classes.avatarContainer}>
							<Typography gutterBottom={true} variant="caption">
								Cena za wszystkie
							</Typography>
							<Avatar className={classes.purpleAvatar}>{price} zł</Avatar>
						</div>
					</Paper>
				</Fade>
			) : null}
		</React.Fragment>
	);
};

paymentConf.propTypes = {
	classes: PropTypes.object,
	amountSelectedImages: PropTypes.array,
	changeDiscountValue: PropTypes.func,
	changeFreePicturesAmount: PropTypes.func,
	changePicturePrice: PropTypes.func,
	discountProcent: PropTypes.any,
	freePicturesAmount: PropTypes.any,
	imagesDataObj: PropTypes.func,
	isUserCreated: PropTypes.bool,
	picturePrice: PropTypes.any,
	userName: PropTypes.string
};

export default withStyles(styles)(paymentConf);
