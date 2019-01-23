import React from 'react';
import classes from './PaymentConf.module.scss';

const paymentConf = (props) => {
	return (
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
					Cena za wszystkie zdjęcia z upustem:
					{Math.round(
						props.imagesAmount * props.picturePrice -
							props.imagesAmount * props.picturePrice * props.discountProcent / 100
					)}
					<span> zł</span>
				</p>
			</div>
		</div>
	);
};

export default paymentConf;
