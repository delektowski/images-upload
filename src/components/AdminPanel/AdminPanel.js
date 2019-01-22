import React from 'react';
import Button from '../Shared/Button/Button';

const AdminPanel = (props) => {
	return (
		<React.Fragment>
			<Button clicked={(e) => props.logout(e)} buttonText="Logout" buttonColor="Button__red" />
			<label>Create User:</label>
			<input placeholder="user name" value={props.loginInputValue} onChange={(e) => props.createUserField(e)} />
			<Button clicked={(e) => props.buttonCreate(e)} buttonText="Create" buttonColor="" />
		</React.Fragment>
	);
};

export default AdminPanel;
