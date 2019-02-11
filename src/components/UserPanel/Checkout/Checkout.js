import React from 'react';
import { Typography, Button } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Payment from '../../UserPanel/Counter/Payment/Payment';

const styles = (theme) => ({
	container: {
		background: 'whitesmoke',
		marginTop: '10vh',
		width: '100%',
		height: '90vh',
		background: 'green'
	},
	imagesContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 0,
		overflow: 'scroll',
		height: '70vh',
		width: '100%',
		background: 'red'
	},
	paymentContainer: {
		width: '100%'
	},
	logout__button: {
		[theme.breakpoints.down('xs')]: {
			height: 60
		}
	},
	buttonsContainer: {
		width: '100%',
		background: 'purple',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		padding: '1%',
		margin: '0 auto',
		width: '90%',
		height: 80,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		background: 'yellow'
	},
	image: {
		width: 150,
		[theme.breakpoints.down('xs')]: {
			width: 100
		}
	},
	bgBlack: {
		background: 'black'
	}
});

const checkout = (props) => {
	const { classes } = props;
	const freePicturesAmount = props.freePicturesAmount;
	const amountAll = props.allSelectedAmount;
	const picturePrice = props.picturePrice;

	const countPayPerImage = (howManySelected) => {
		if (howManySelected > freePicturesAmount) {
			return (howManySelected - freePicturesAmount) * picturePrice;
		}
		return 0;
	};

	const allImagesCost = () => {
		const discount = (amountAll - freePicturesAmount) * picturePrice * (props.discountProcent / 100);
		let price = Math.round((amountAll - freePicturesAmount) * picturePrice - discount);
		if (price < 0) price = 0;
		return price;
	};

	const getSelectedTitles = () => {
		const selectedImages = [];
		for (let imageTitle in props.imagesDataObj) {
			if (props.imagesDataObj[imageTitle].isClickedGreen === true) {
				selectedImages.push(imageTitle);
			}
		}

		return selectedImages;
	};

	return (
		<React.Fragment>
			<div className={classes.container}>
				<div className={classes.paymentContainer}>
					<Payment
						allSelectedAmount={props.allSelectedAmount}
						selectedGreenAmount={props.selectedGreenAmount}
						freePicturesAmount={props.freePicturesAmount}
						discountProcent={props.discountProcent}
						picturePrice={props.picturePrice}
						isCheckout={props.isCheckout}
					/>
				</div>
				<div className={classes.buttonsContainer}>
					<div className={classes.buttonContainer}>
						<Button
							variant="contained"
							size="small"
							color="primary"
							className={[ classes.logout__button, classes.bgBlack ].join(' ')}
							fullWidth
							// onClick={(e) => this.onCreateUserHandler(e)}
						>
							<Typography variant="overline" />
							wszystkie zdjęcia
						</Button>
						<Typography variant="overline" style={{ fontSize: '.5rem' }}>
							<strong>koszt: {allImagesCost()} zł </strong>{' '}
						</Typography>
					</div>
					<div className={classes.buttonContainer}>
						<Button
							variant="contained"
							size="small"
							color="primary"
							className={classes.logout__button}
							fullWidth
							color="secondary"
							// onClick={(e) => this.onCreateUserHandler(e)}
							// disabled={!(this.state.userValidation && this.state.passwordValidation)}
						>
							<Typography variant="overline" />
							darmowe + dodatkowe zdjęcia
						</Button>
						<Typography variant="overline" style={{ fontSize: '.5rem' }}>
							<strong>koszt: {countPayPerImage(props.selectedGreenAmount)} zł </strong>{' '}
						</Typography>
					</div>
				</div>

				<div className={[ classes.paper, classes.imagesContainer ].join(' ')}>
					{getSelectedTitles().map((ele) => (
						<figure key={ele}>
							<img className={classes.image} src={props.imagesDataObj[ele].path} alt={ele} />
							<figcaption style={{ textAlign: 'center', fontSize: '.7rem' }}>{ele}</figcaption>
						</figure>
					))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default withStyles(styles)(checkout);
