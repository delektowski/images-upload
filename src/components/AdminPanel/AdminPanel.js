import React from 'react';
import Uploader from './Uploader/Uploader';
import PaymentConf from './PaymentConf/PaymentConf';
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
				userName={props.userName}
			/>

			<PaymentConf
				freePicturesAmount={props.freePicturesAmount}
				discountProcent={props.discountProcent}
				changeFreePicturesAmount={props.changeFreePicturesAmount}
				changeDiscountValue={props.changeDiscountValue}
				imagesAmount={props.imagesAmount}
				changePicturePrice={props.changePicturePrice}
				picturePrice={props.picturePrice}
				userName={props.userName}
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
