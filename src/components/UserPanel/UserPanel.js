import React from 'react';
import Counter from '../UserPanel/Counter/Counter';
import Filter from '../UserPanel/Filter/Filter';
import Reset from '../UserPanel/Reset/Reset';
import Logout from '../Logout/Logout';

const UserPanel = (props) => {
	return (
		<React.Fragment>
			<Logout userName={props.userName} onLogoutHandler={(e) => props.buttonLogout(e)} />
			<Counter
				imagesDataObj={props.imagesDataObj}
				freePicturesAmount={props.freePicturesAmount}
				discountProcent={props.discountProcent}
				picturePrice={props.picturePrice}
			/>
			<Filter filterButtonsState={props.filterButtonsState} />
			<Reset userName={props.userName} imagesDataObj={props.imagesDataObj} />
		</React.Fragment>
	);
};

export default UserPanel;
