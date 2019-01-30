import React from 'react';
import Button from '../../Shared/Button/Button';
import { Fade } from '@material-ui/core/';
import firebase from 'firebase/app';
import 'firebase/database';
import classes from './PaymentConf.module.scss';

const paymentConf = (props) => {
	const updatePaymentConf = () => {
		firebase.database().ref(props.userName + '/').child('paymentConfig').set({
			freePicturesAmount: props.freePicturesAmount,
			picturePrice: props.picturePrice,
			discountProcent: props.discountProcent
		});
	};

	return (
		<Fade in={true} timeout={500}>
			<div className={classes.PaymentConf}>
				<div>
					<label>Liczba darmowych zdjęć:</label>
					<input
						onChange={(e) => props.changeFreePicturesAmount(e.target.value)}
						className={classes.PaymentConf__inputField}
						type="number"
						value={props.freePicturesAmount}
					/>
				</div>

				<div>
					<label>Upust za wszystkie zdjęcia:</label>
					<input
						onChange={(e) => props.changeDiscountValue(e.target.value)}
						className={classes.PaymentConf__inputField}
						type="number"
						value={props.discountProcent}
					/>
					<span>%</span>
					<p>Liczba zdjęć: {props.imagesAmount}</p>
				</div>
				<div>
					<label>Cena jednego zdjęcia:</label>
					<input
						onChange={(e) => props.changePicturePrice(e.target.value)}
						className={classes.PaymentConf__inputField}
						type="number"
						value={props.picturePrice}
					/>
					<span>zł</span>
					<p>
						Cena za wszystkie zdjęcia z upustem:{' '}
						{Math.round(
							props.imagesAmount * props.picturePrice -
								props.imagesAmount * props.picturePrice * props.discountProcent / 100
						)}
						<span> zł</span>
					</p>
				</div>
				<Button clicked={() => updatePaymentConf()} buttonText="Update" buttonColor="Button__blue" />
			</div>
		</Fade>
	);
};

export default paymentConf;
