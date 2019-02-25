import React, { PureComponent } from 'react';
import { Paper, Typography, FormControl, InputLabel, Input, Button, Fade } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const styles = (theme) => ({
	container: {
		position: 'relative',
		zIndex: 1200,
		marginTop: 100,
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up('sm')]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',

		padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},
	form: {
		marginTop: theme.spacing.unit,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
		[theme.breakpoints.down('xs')]: {
			width: '90%'
		}
	},
	info: {
		fontSize: '.6rem'
	}
});

class Login extends PureComponent {
	state = {
		loginField: 'test',
		passwordField: 'testtest',
		errorLogin: ''
	};

	onLoginHandler = (e) => {
		if (e) e.preventDefault();

		if (this.state.loginField && this.state.passwordField && this.props.isCreateUserLogin === '') {
			firebase
				.auth()
				.signInWithEmailAndPassword(`${this.state.loginField}@aaa.aa`, this.state.passwordField)
				.then(() => {
					if (this.state.loginField === 'admin') {
						this.props.onIsAdminLogin();
						this.props.onIsLoginClicked();
					} else {
						this.props.isAuthenticated();
						this.props.onChangeUserName(this.state.loginField);
					}
				})
				.catch(() => {
					this.setState({ errorLogin: 'Błędne hasło lub login' });
				});

			firebase.auth().onAuthStateChanged((user) => {
				console.log('loooooooooooooooggggggggggggiiiiiinnnnnnnnn', this.state.loginField);

				if (user) {
					const userNameDbElement = firebase.database().ref(this.state.loginField);
					userNameDbElement.once('value', (snapshot) => {
						if (!snapshot.exists()) return;
						const imagesDataObj = snapshot.val();
						console.log('uuuuuuloooogin', imagesDataObj.images);

						this.props.onLoginDataPass(
							imagesDataObj.images,
							imagesDataObj.paymentConfig.freePicturesAmount,
							imagesDataObj.paymentConfig.picturePrice,
							imagesDataObj.paymentConfig.discountProcent
						);
					});
				}
			});
		}
	};

	onLoginClickedHandler = (e) => {
		switch (e.target.getAttribute('data-value')) {
			case 'login':
				if (e.key === 'Enter') {
					this.onLoginHandler(e);
					break;
				}
				this.setState({ loginField: e.target.value });
				break;

			case 'password':
				if (e.key === 'Enter') {
					this.onLoginHandler(e);
					break;
				}
				this.setState({ passwordField: e.target.value });
				break;

			default:
				if (!(this.state.loginField && this.state.passwordField)) {
					this.setState({ errorLogin: 'Nie został podany login lub hasło' });
				}

				this.onLoginHandler(e);
				break;
		}
	};

	render() {
		console.count('LOGIN');

		const { classes } = this.props;

		return (
			<React.Fragment>
				<Fade in={true} timeout={2000}>
					<div className={classes.container}>
						<Paper className={classes.paper}>
							<Typography color="secondary" variant="overline">
								{this.state.errorLogin}
							</Typography>
							<form className={classes.form}>
								<FormControl error={Boolean(this.state.errorLogin)} margin="normal" required>
									<InputLabel htmlFor="login">Użytkownik</InputLabel>
									<Input
										id="login"
										type="text"
										autoComplete="off"
										autoFocus
										value={this.state.loginField}
										onChange={(e) => this.onLoginClickedHandler(e)}
										inputProps={{ 'data-value': 'login' }}
									/>
								</FormControl>

								<FormControl error={Boolean(this.state.errorLogin)} margin="normal" required>
									<InputLabel htmlFor="password">Hasło</InputLabel>
									<Input
										id="password"
										type="password"
										autoComplete="off"
										value={this.state.passwordField}
										onChange={(e) => this.onLoginClickedHandler(e)}
										inputProps={{ 'data-value': 'password' }}
										onKeyPress={(e) => this.onLoginClickedHandler(e)}
									/>
								</FormControl>
							</form>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								data-value="button"
								onClick={(e) => this.onLoginClickedHandler(e)}
							>
								Zaloguj
							</Button>
						</Paper>
					</div>
				</Fade>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Login);
