import React from 'react';
import Button from '../Shared/Button/Button';
import Uploader from './Uploader/Uploader';
import PaymentConf from './PaymentConf/PaymentConf';
import CreateUser from './CreateUser/CreateUser';

const AdminPanel = (props) => {
	return (
		<React.Fragment>
			<Button clicked={(e) => props.logout(e)} buttonText="Logout" buttonColor="Button__red" />
			<CreateUser
				loginInputValue={props.loginInputValue}
				createUserLogin={(e) => props.createUserLogin(e)}
				passwordInputValue={props.passwordInputValue}
				createUserPassword={(e) => props.createUserPassword(e)}
				buttonCreate={(e) => props.buttonCreate(e)}
			/>

			<PaymentConf
				freePicturesAmount={props.freePicturesAmount}
				discountProcent={props.discountProcent}
				changeFreePicturesAmount={props.changeFreePicturesAmount}
				changeDiscountValue={props.changeDiscountValue}
				imagesAmount={props.imagesAmount}
				changePicturePrice={props.changePicturePrice}
				picturePrice={props.picturePrice}
			/>

			<Uploader
				userName={props.userName}
				pickSelectedImages={props.pickSelectedImages}
				uploadSelectedImages={props.uploadSelectedImages}
				isButtonDisabled={props.isButtonDisabled}
				disableButton={props.disableButton}
			/>
		</React.Fragment>
	);
};

export default AdminPanel;
