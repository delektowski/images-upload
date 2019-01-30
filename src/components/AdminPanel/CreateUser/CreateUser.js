import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Input, InputLabel, FormControl, Button, Fade } from '@material-ui/core/';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		width: '100%'
	},

	bar: {
		background: 'whitesmoke',

		marginTop: 10,
		height: '15vh',
		display: 'flex',
		justifyContent: 'center',

		[theme.breakpoints.down('xs')]: {
			height: 210
		}
	},
	bar__logout: {
		background: 'whitesmoke',
		marginTop: 10,
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
		position: 'fixed',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column'
		}
	},
	margin: {
		margin: theme.spacing.unit
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
		isUserCreated: false
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
					freePicturesAmount: this.props.freePicturesAmount,
					picturePrice: this.props.picturePrice,
					discountProcent: this.props.discountProcent
				});

				this.setState({ isUserCreated: true });

				const userNameDbElement = firebase.database().ref(this.state.createUserLogin);
				userNameDbElement.on('value', (snapshot) => {
					if (!snapshot.exists()) return;
					const imagesDataObj = snapshot.val();

					this.props.imagesDataObj(imagesDataObj.images);
					this.props.LoginClicked();
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

		this.state.isUserCreated
			? (logout = (
					<Fade in={this.state.isUserCreated} timeout={2000}>
						<AppBar position="static" className={classes.bar__logout}>
							<Toolbar className={classes.toolBar}>
								<Button
									variant="contained"
									color="secondary"
									className={classes.submit}
									onClick={(e) => this.props.clicked(e)}
								>
									Wyloguj
								</Button>
							</Toolbar>
						</AppBar>
					</Fade>
				))
			: (createUser = (
					<Fade in={!this.state.isUserCreated} timeout={2000}>
						<AppBar position="static" className={classes.bar}>
							<Toolbar className={classes.toolBar}>
								<FormControl className={classes.margin}>
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
									color="primary"
									className={classes.submit}
									onClick={(e) => this.onCreateUserHandler(e)}
									disabled={!(this.state.userValidation && this.state.passwordValidation)}
								>
									Stwórz użytkownika
								</Button>
							</Toolbar>
						</AppBar>
					</Fade>
				));
		return (
			<React.Fragment>
				<div className={classes.root}>
					{createUser}
					{logout}
				</div>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(CreateUser);
