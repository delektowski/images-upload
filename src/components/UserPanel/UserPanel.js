import React from 'react';
import Button from '../Shared/Button/Button';
import Counter from '../UserPanel/Counter/Counter';
import Filter from '../UserPanel/Filter/Filter';
import Reset from '../UserPanel/Reset/Reset';

const UserPanel = (props) => {
	return (
		<React.Fragment>
			<Button clicked={(e) => props.buttonLogout(e)} buttonText="Logout" buttonColor="Button__red" />
			<Counter imagesDataObj={props.imagesDataObj} />
			<Filter filterButtonsState={props.filterButtonsState} />
			<Reset userName={props.userName} imagesDataObj={props.imagesDataObj} />
		</React.Fragment>
	);
};

export default UserPanel;
