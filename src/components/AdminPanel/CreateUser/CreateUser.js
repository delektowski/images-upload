import React, { Component } from 'react';
import PaymentConf from '../../AdminPanel/PaymentConf/PaymentConf';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Input, InputLabel, FormControl, Button, Fade } from '@material-ui/core/';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const styles = (theme) => ({
	root: {
		width: '100%'
	},
	bar: {
		marginTop: 40,
		background: 'whitesmoke',
		display: 'flex',
		justifyContent: 'center',

		[theme.breakpoints.down('xs')]: {
			height: 140,
			marginTop: 15
		}
	},
	toolBar: {
		position: 'static',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column'
		}
	},
	bar__logout: {
		background: 'whitesmoke',
		height: '7vh',
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('xs')]: {
			height: 60
		}
	},
	logout__button: {
		marginTop: '1%',
		paddingTop: 13,
		paddingBottom: 13,

		[theme.breakpoints.down('sm')]: {
			fontSize: '.8rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '.6rem',
			marginTop: '3%',
			marginBottom: '2%',
			paddingTop: 15,
			paddingBottom: 15
		}
	},
	input: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '.7rem'
		}
	},
	info: {
		fontSize: '.6rem'
	}
});

class CreateUser extends Component {
	state = {
		userValidation: false,
		passwordValidation: false,
		passwordFieldClicked: false,
		userFieldClicked: false,
		createUserLogin: '',
		createUserPassword: '',
		onUserCreated: false,
		freePicturesAmount: 0,
		discountProcent: 60,
		picturePrice: 5
	};

	onValidationHandler = (e) => {
		switch (e.target.getAttribute('data-value')) {
			case 'user':
				if (e.target.value.length >= 2) {
					this.setState({ userValidation: true, userFieldClicked: false });
				} else {
					this.setState({
						userValidation: false,
						userFieldClicked: true
					});
				}
				break;

			case 'password':
				if (e.target.value.length >= 6) {
					this.setState({ passwordValidation: true, passwordFieldClicked: false });
				} else {
					this.setState({ passwordValidation: false, passwordFieldClicked: true });
				}
				break;

			default:
				break;
		}
		this.onCreateClickedHandler(e);
	};

	changeFreePicturesAmountHandler = (value) => {
		if (value < 0) value = '';
		this.setState({
			freePicturesAmount: value
		});

		this.updatePaymentConfOnFirebase('freePicturesAmount', value);
	};

	changeDiscountValueHandler = (value) => {
		if (value < 0) value = '';
		this.setState({
			discountProcent: value
		});
		this.updatePaymentConfOnFirebase('discountProcent', value);
	};

	changepicturePriceHandler = (value) => {
		if (value < 0) value = '';
		this.setState({
			picturePrice: value
		});
		this.updatePaymentConfOnFirebase('picturePrice', value);
	};

	updatePaymentConfOnFirebase = (key, value) => {
		firebase.database().ref(this.state.createUserLogin + '/').child('paymentConfig').update({
			[key]: value
		});
	};

	onCreateUserHandler = (e) => {
		e.preventDefault();
		this.props.adminLogin();
		this.props.onChangeUserName(this.state.createUserLogin);

		firebase
			.auth()
			.createUserWithEmailAndPassword(`${this.state.createUserLogin}@aaa.aa`, this.state.createUserPassword)
			.then((resp) => {
				console.log(`${resp.user.email} is ${resp.operationType}`);
				firebase.database().ref(this.state.createUserLogin + '/').child('paymentConfig').set({
					freePicturesAmount: this.state.freePicturesAmount,
					picturePrice: this.state.picturePrice,
					discountProcent: this.state.discountProcent
				});
				this.setState({ onUserCreated: true });
				this.props.onUserCreated();
				this.props.loginClicked();
			})
			.catch(function(error) {
				console.log('Create error: ', error);
			});
	};

	onCreateClickedHandler = (e) => {
		switch (e.target.getAttribute('data-value')) {
			case 'user':
				this.setState({ createUserLogin: e.target.value });
				break;

			case 'password':
				if (e.key === 'Enter') {
					this.onCreateUserHandler(e);
					break;
				}
				this.setState({ createUserPassword: e.target.value });
				break;

			default:
				this.onCreateUserHandler(e);
				break;
		}
	};

	render() {
		const { classes } = this.props;
		let createUser = null;

		if (!this.state.onUserCreated) {
			createUser = (
				<React.Fragment>
					<Fade in={!this.state.onUserCreated} timeout={500}>
						<AppBar position="static" className={classes.bar}>
							<Toolbar className={classes.toolBar}>
								<FormControl className={classes.formControl}>
									<InputLabel className={classes.input} htmlFor="custom-css-standard-input">
										nazwa <span className={classes.info}> (min. 2 znaki)</span>
									</InputLabel>
									<Input
										className={classes.input}
										id="create-login-input"
										value={this.state.createUserLogin}
										onChange={this.onValidationHandler}
										inputProps={{ 'data-value': 'user' }}
									/>
								</FormControl>
								<FormControl className={classes.margin}>
									<InputLabel className={classes.input} htmlFor="custom-css-standard-input">
										hasło <span className={classes.info}> (min. 6 znaków)</span>
									</InputLabel>
									<Input
										className={classes.input}
										id="create-password-input"
										value={this.state.createUserPassword}
										onChange={this.onValidationHandler}
										onKeyPress={(e) => this.onCreateClickedHandler(e)}
										inputProps={{ 'data-value': 'password' }}
									/>
								</FormControl>
							</Toolbar>
						</AppBar>
					</Fade>
					<Fade in={!this.state.onUserCreated} timeout={500}>
						<Button
							variant="contained"
							size="small"
							color="primary"
							fullWidth
							className={classes.logout__button}
							onClick={(e) => this.onCreateUserHandler(e)}
							disabled={!(this.state.userValidation && this.state.passwordValidation)}
						>
							Stwórz użytkownika
						</Button>
					</Fade>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<div className={classes.root}>
					{createUser}
					<PaymentConf
						freePicturesAmount={this.state.freePicturesAmount}
						discountProcent={this.state.discountProcent}
						amountSelectedImages={this.props.amountSelectedImages}
						changeFreePicturesAmount={this.changeFreePicturesAmountHandler}
						changeDiscountValue={this.changeDiscountValueHandler}
						changePicturePrice={this.changepicturePriceHandler}
						picturePrice={this.state.picturePrice}
						userName={this.state.createUserLogin}
						isUserCreated={this.state.onUserCreated}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(CreateUser);
