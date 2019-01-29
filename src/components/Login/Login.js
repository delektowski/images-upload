import React, { Component } from 'react';
import { Paper, Typography, FormControl, InputLabel, Input, Button, Fade } from '@material-ui/core/';
// import Button from '../Shared/Button/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	main: {
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
		padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},

	form: {
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

class Login extends Component {
	state = {
		passwordValidation: false,
		loginValidation: false,
		loginFiledClicked: false,
		passwordFieldClicked: false
	};

	onValidationHandler = (e) => {
		switch (e.target.getAttribute('data-value')) {
			case 'login':
				if (e.target.value.length >= 2) {
					this.setState({ loginValidation: true, loginFiledClicked: false });
				} else {
					this.setState({
						loginValidation: false,
						loginFiledClicked: true
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
		this.props.onLogin(e);
	};

	render() {
		const { classes } = this.props;

		return (
			<React.Fragment>
				<Fade in={true} timeout={2000}>
					<main className={classes.main}>
						<Paper className={classes.paper}>
							<Typography component="h1" variant="h5">
								Logowanie
							</Typography>
							<form className={classes.form}>
								<FormControl margin="normal" required>
									<InputLabel htmlFor="login">Nazwa użytkownika</InputLabel>
									<Input
										id="login"
										type="text"
										autoComplete="off"
										autoFocus
										value={this.props.loginField}
										onChange={this.onValidationHandler}
										inputProps={{ 'data-value': 'login' }}
									/>
								</FormControl>

								{this.state.loginFiledClicked ? (
									<p style={{ color: 'red', marginTop: '0', fontSize: '0.7rem' }}>Minimum 2 znaki</p>
								) : null}

								<FormControl margin="normal" required>
									<InputLabel htmlFor="password">Hasło</InputLabel>
									<Input
										id="password"
										type="password"
										autoComplete="off"
										value={this.props.passwordFiled}
										onChange={this.onValidationHandler}
										inputProps={{ 'data-value': 'password' }}
										onKeyPress={this.onValidationHandler}
									/>
								</FormControl>
							</form>

							{this.state.passwordFieldClicked ? (
								<p style={{ color: 'red', marginTop: '0', fontSize: '0.7rem' }}>Minimum 6 znaków</p>
							) : null}

							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								data-value="button"
								onClick={(e) => this.props.onLogin(e)}
								disabled={!(this.state.loginValidation && this.state.passwordValidation)}
							>
								Zaloguj
							</Button>
						</Paper>
					</main>
				</Fade>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Login);
