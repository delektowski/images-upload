import React from 'react';
import Button from '../../Shared/Button/Button';

const CreateUser = (props) => {
	return (
		<React.Fragment>
			<label>Create User:</label>
			<input
				type="email"
				placeholder="user name"
				value={props.loginInputValue}
				onChange={(e) => props.createUserLogin(e)}
			/>
			<label>Password:</label>
			<input
				type="password"
				placeholder="user password"
				value={props.passwordInputValue}
				onChange={(e) => props.createUserPassword(e)}
			/>
			<Button clicked={(e) => props.buttonCreate(e)} buttonText="Create" buttonColor="" />
		</React.Fragment>
	);
};

export default CreateUser;
