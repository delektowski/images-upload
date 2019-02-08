import React from 'react';
import Counter from '../UserPanel/Counter/Counter';

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
				amountAll={props.amountAll}
			/>
		</React.Fragment>
	);
};

export default UserPanel;
