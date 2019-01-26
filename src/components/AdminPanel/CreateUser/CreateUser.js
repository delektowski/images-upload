import React, { Component } from 'react';
import Button from '../../Shared/Button/Button';

class CreateUser extends Component {
	state = {
		userValidation: false,
		passwordValidation: false,
		passwordFieldClicked: false,
		userFiledClicked: false
	};

	onValidationHandler = (e) => {
		switch (e.target.getAttribute('data-value')) {
			case 'user':
				if (e.target.value.length >= 2) {
					this.setState({ userValidation: true, userFiledClicked: false });
				} else {
					this.setState({
						userValidation: false,
						userFiledClicked: true
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
		this.props.onCreateUser(e);
	};

	render() {
		return (
			<React.Fragment>
				<label>User:</label>
				<input
					type="email"
					placeholder="user name"
					value={this.props.loginInputValue}
					onChange={this.onValidationHandler}
					data-value="user"
				/>
				{this.state.userFiledClicked ? (
					<p style={{ color: 'red', marginTop: '0', fontSize: '0.7rem' }}>Minimum 2 znaki</p>
				) : null}
				<label>Password:</label>
				<input
					type="password"
					placeholder="user password"
					value={this.props.passwordInputValue}
					onChange={this.onValidationHandler}
					data-value="password"
				/>
				{this.state.passwordFieldClicked ? (
					<p style={{ color: 'red', marginTop: '0', fontSize: '0.7rem' }}>Minimum 6 znaków</p>
				) : null}
				<Button
					clicked={(e) => this.props.buttonCreate(e)}
					buttonText="Create"
					buttonColor=""
					isButtonDisabled={!(this.state.userValidation && this.state.passwordValidation)}
					data-value="button"
				/>
			</React.Fragment>
		);
	}
}

export default CreateUser;
