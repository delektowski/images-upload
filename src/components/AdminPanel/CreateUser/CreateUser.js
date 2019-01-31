import React, { Component } from 'react';
import Logout from '../../Logout/Logout';
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
		background: 'whitesmoke',
		// height: '15vh',
		display: 'flex',
		justifyContent: 'center',

		[theme.breakpoints.down('xs')]: {
			height: 260
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
		[theme.breakpoints.down('sm')]: {
			fontSize: '.8rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '.6rem',
			marginTop: 10,
			marginBottom: 10,
			paddingTop: 10,
			paddingBottom: 10
		}
	},
	input: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '.7rem'
		}
	},
	info: {
		fontSize: '.6rem'
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
	formControl: {
		margin: theme.spacing.unit,
		[theme.breakpoints.down('xs')]: {}
	},
	submit: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '.8rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '.6rem',
			marginTop: 30,
			marginBottom: 20,
			paddingTop: 10,
			paddingBottom: 10
		}
	},
	inputBackground: {
		background: 'rgba(190, 190, 190, 0.227)',
		borderRadius: '5px',
		border: '1px solid rgba(190, 190, 190, 0.827)'
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
		isUserCreated: false,
		freePicturesAmount: 5,
		discountProcent: 50,
		picturePrice: 10
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
		this.setState({
			freePicturesAmount: value
		});
	};

	changeDiscountValueHandler = (value) => {
		this.setState({
			discountProcent: value
		});
	};

	changepicturePriceHandler = (value) => {
		this.setState({
			picturePrice: value
		});
	};

	onCreateUserHandler = (e) => {
		e.preventDefault();
		this.props.adminLogin();
		this.props.onChangeUserName(this.state.createUserLogin);

		firebase
			.auth()
			.createUserWithEmailAndPassword(`${this.state.createUserLogin}@aaa.aa`, this.state.createUserPassword)
			.then((resp) => console.log(`${resp.user.email} is ${resp.operationType}`))
			.catch(function(error) {
				console.log('Create error: ', error);
			});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.database().ref(this.state.createUserLogin + '/').child('paymentConfig').set({
					freePicturesAmount: this.state.freePicturesAmount,
					picturePrice: this.state.picturePrice,
					discountProcent: this.state.discountProcent
				});
				this.setState({ isUserCreated: true });
				const userNameDbElement = firebase.database().ref(this.state.createUserLogin);
				userNameDbElement.on('value', (snapshot) => {
					if (!snapshot.exists()) return;
					const imagesDataObj = snapshot.val();
					if (imagesDataObj.images) {
						this.props.imagesDataObj(imagesDataObj.images);
					}
					this.props.loginClicked();
				});
			}
		});
	};

	onCreateClickedHandler = (e) => {
		switch (e.target.getAttribute('data-value')) {
			case 'user':
				this.setState({ createUserLogin: e.target.value });
				break;

			case 'password':
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
		let logout = null;

		if (this.state.isUserCreated) {
			logout = (
				<Fade in={this.state.isUserCreated} timeout={500}>
					<AppBar position="static" className={classes.bar__logout}>
						<Toolbar className={classes.toolBar}>
							<Logout
								userName={this.state.createUserLogin}
								onLogoutHandler={this.props.onLogoutHandler}
							/>
						</Toolbar>
					</AppBar>
				</Fade>
			);
		} else {
			createUser = (
				<React.Fragment>
					<Fade in={!this.state.isUserCreated} timeout={500}>
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
										inputProps={{ 'data-value': 'password' }}
									/>
								</FormControl>

								<Button
									variant="contained"
									size="small"
									color="primary"
									className={classes.submit}
									onClick={(e) => this.onCreateUserHandler(e)}
									disabled={!(this.state.userValidation && this.state.passwordValidation)}
								>
									Stwórz użytkownika
								</Button>
								<Logout
									userName={this.state.createUserLogin}
									onLogoutHandler={this.props.onLogoutHandler}
								/>
							</Toolbar>
						</AppBar>
					</Fade>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<div className={classes.root}>
					{createUser}
					{logout}
					<Fade in={!this.state.isUserCreated} timeout={500}>
						<PaymentConf
							freePicturesAmount={this.state.freePicturesAmount}
							discountProcent={this.state.discountProcent}
							imagesAmount={this.state.imagesAmount}
							changeFreePicturesAmount={this.changeFreePicturesAmountHandler}
							changeDiscountValue={this.changeDiscountValueHandler}
							changePicturePrice={this.changepicturePriceHandler}
							picturePrice={this.state.picturePrice}
							userName={this.state.createUserLogin}
						/>
					</Fade>
				</div>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(CreateUser);
