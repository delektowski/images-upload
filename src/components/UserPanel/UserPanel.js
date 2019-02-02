import React from 'react';
import Counter from '../UserPanel/Counter/Counter';
import Filter from '../UserPanel/Filter/Filter';
import Reset from '../UserPanel/Reset/Reset';

const UserPanel = (props) => {
	return (
		<React.Fragment>
			<Counter
				imagesDataObj={props.imagesDataObj}
				freePicturesAmount={props.freePicturesAmount}
				discountProcent={props.discountProcent}
				picturePrice={props.picturePrice}
				onFilterButtonsState={props.onFilterButtonsState}
				filterButtonsState={props.filterButtonsState}
			/>
			<Reset userName={props.userName} imagesDataObj={props.imagesDataObj} />
		</React.Fragment>
	);
};

export default UserPanel;
