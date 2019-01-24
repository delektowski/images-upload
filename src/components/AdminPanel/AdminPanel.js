import React from 'react';
import Button from '../Shared/Button/Button';
import Uploader from './Uploader/Uploader';
import PaymentConf from './PaymentConf/PaymentConf';

const AdminPanel = (props) => {
	return (
		<React.Fragment>
			<Button clicked={(e) => props.logout(e)} buttonText="Logout" buttonColor="Button__red" />
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