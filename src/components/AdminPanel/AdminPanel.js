import React from 'react';
import Uploader from './Uploader/Uploader';
import CreateUser from './CreateUser/CreateUser';
import PropTypes from 'prop-types';

const AdminPanel = (props) => {
	console.count('ADMINPANEL');
	return (
		<React.Fragment>
			<CreateUser
				loginInputValue={props.loginInputValue}
				onCreateUser={(e) => props.onCreateUser(e)}
				passwordInputValue={props.passwordInputValue}
				buttonCreate={(e) => props.buttonCreate(e)}
				clicked={props.logout}
				adminLogin={props.adminLogin}
				onChangeUserName={props.onChangeUserName}
				freePicturesAmount={props.freePicturesAmount}
				picturePrice={props.picturePrice}
				discountProcent={props.discountProcent}
				imagesDataObj={props.imagesDataObj}
				loginClicked={props.loginClicked}
				amountSelectedImages={props.uploadSelectedImages}
				onUserCreated={props.onUserCreated}
			/>

			<Uploader
				userName={props.userName}
				pickSelectedImages={props.pickSelectedImages}
				uploadSelectedImages={props.uploadSelectedImages}
				isButtonDisabled={props.isButtonDisabled}
				disableButton={props.disableButton}
				imagesDataObj={props.imagesDataObj}
				loginClicked={props.loginClicked}
				selectedfiles={props.selectedfiles}
				isUserCreated={props.isUserCreated}
			/>
		</React.Fragment>
	);
};

AdminPanel.propTypes = {
	adminLogin: PropTypes.func,
	discountProcent: PropTypes.number,
	imagesAmount: PropTypes.number,
	imagesDataObj: PropTypes.func,
	isButtonDisabled: PropTypes.bool,
	loginClicked: PropTypes.func,
	logout: PropTypes.func,
	onChangeUserName: PropTypes.func,
	onUserCreated: PropTypes.func,
	picturePrice: PropTypes.number,
	selectedfiles: PropTypes.func,
	uploadSelectedImages: PropTypes.number,
	userName: PropTypes.string
};

export default AdminPanel;
