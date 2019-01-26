import React, { Component } from 'react';
import Button from '../Shared/Button/Button';

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
		return (
			<React.Fragment>
				<label>Login:</label>
				<input
					placeholder="user login"
					value={this.props.loginField}
					onChange={this.onValidationHandler}
					data-value="login"
				/>
				{this.state.loginFiledClicked ? (
					<p style={{ color: 'red', marginTop: '0', fontSize: '0.7rem' }}>Minimum 2 znaki</p>
				) : null}
				<label>Password:</label>
				<input
					placeholder="user password"
					value={this.props.passwordFiled}
					onChange={this.onValidationHandler}
					onKeyPress={this.onValidationHandler}
					data-value="password"
				/>
				{this.state.passwordFieldClicked ? (
					<p style={{ color: 'red', marginTop: '0', fontSize: '0.7rem' }}>Minimum 6 znaków</p>
				) : null}
				<Button
					clicked={this.props.onLogin}
					buttonText="Login"
					buttonColor="Button__blue"
					dataValue="button"
					isButtonDisabled={!(this.state.loginValidation && this.state.passwordValidation)}
				/>
			</React.Fragment>
		);
	}
}

export default Login;
