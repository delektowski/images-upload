import React from 'react';
import Uploader from './Uploader/Uploader';

import CreateUser from './CreateUser/CreateUser';

const AdminPanel = (props) => {
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

export default AdminPanel;
