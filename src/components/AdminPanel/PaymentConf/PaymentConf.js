import React from 'react';
import { Fade, AppBar, Toolbar, TextField, InputAdornment } from '@material-ui/core/';
import firebase from 'firebase/app';
import 'firebase/database';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	bar: {
		marginTop: '1%'
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
	}
});

const paymentConf = (props) => {
	const updatePaymentConf = () => {
		firebase.database().ref(props.userName + '/').child('paymentConfig').set({
			freePicturesAmount: props.freePicturesAmount,
			picturePrice: props.picturePrice,
			discountProcent: props.discountProcent
		});
	};
	const { classes } = props;

	return (
		<Fade in={true} timeout={500}>
			<AppBar position="static" className={classes.bar}>
				<Toolbar className={classes.toolBar}>
					<form className={classes.container} noValidate autoComplete="off">
						<TextField
							id="outlined-adornment-weight"
							className={classes.textField}
							variant="outlined"
							type="text"
							label="Darmowe zdjęcia"
							margin="dense"
							value={props.freePicturesAmount}
							onChange={(e) => props.changeFreePicturesAmount(e.target.value)}
							InputProps={{
								endAdornment: <InputAdornment position="end">szt.</InputAdornment>
							}}
						/>
					</form>
					<form className={classes.container} noValidate autoComplete="off">
						<TextField
							id="outlined-adornment-weight"
							className={classes.textField}
							variant="outlined"
							type="text"
							label="Upust za wszystko"
							margin="dense"
							value={props.discountProcent}
							onChange={(e) => props.changeDiscountValue(e.target.value)}
							InputProps={{
								endAdornment: <InputAdornment position="end">%</InputAdornment>
							}}
						/>
					</form>
					<form className={classes.container} noValidate autoComplete="off">
						<TextField
							id="outlined-adornment-weight"
							className={classes.textField}
							variant="outlined"
							type="text"
							label="Cena za zdjęcie"
							margin="dense"
							value={props.picturePrice}
							onChange={(e) => props.changePicturePrice(e.target.value)}
							InputProps={{
								endAdornment: <InputAdornment position="end">zł</InputAdornment>
							}}
						/>
					</form>
				</Toolbar>
			</AppBar>
		</Fade>
	);
};

export default withStyles(styles)(paymentConf);
