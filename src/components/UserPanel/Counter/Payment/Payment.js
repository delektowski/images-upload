import React from 'react';
import classes from './Payment.module.scss';
import SelectPayment from './SelectPayment/SelectPayment';

const Payment = (props) => {
	const imagesForFree = props.freePicturesAmount;
	const picturePrice = props.picturePrice;
	const countPayPerImage = (howManySelected) => {
		if (howManySelected > imagesForFree) {
			return (howManySelected - imagesForFree) * picturePrice;
		}
		return 0;
	};

	return (
		<React.Fragment>
			<div className={classes.Payment}>
				<p>
					Możesz wybrać {imagesForFree} zdjęć. Każde kolejne kosztuje {picturePrice} zł
				</p>
				<p>
					Zdjęcia za darmo:{' '}
					<span style={{ color: 'blue' }}>
						{imagesForFree - props.selectedGreenAmount > 0 ? (
							imagesForFree - props.selectedGreenAmount
						) : (
							0
						)}{' '}
						zdjęć
					</span>{' '}
				</p>
				<p>
					Koszt dodatkowych zdjęć:{' '}
					<span style={{ color: 'blue' }}>{countPayPerImage(props.selectedGreenAmount)} zł</span>
				</p>
			</div>
			<SelectPayment
				allSelectedAmount={props.allSelectedAmount}
				paymentPerImage={countPayPerImage(props.selectedGreenAmount)}
				picturePrice={props.picturePrice}
				discountProcent={props.discountProcent}
			/>
		</React.Fragment>
	);
};

export default Payment;
