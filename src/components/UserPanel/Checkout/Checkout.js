import React from 'react';
import { Button } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Payment from '../../UserPanel/Counter/Payment/Payment';

const styles = (theme) => ({
	container: {
		marginTop: 65,
		width: '100%',
		height: 'auto',
		overflow: 'hidden',
		position: 'fixed'
	},
	imagesContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 160,
		overflow: 'scroll',
		height: `calc(${window.innerHeight}px - 160px)`,
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			marginTop: 180
		}
	},
	paymentContainer: {
		width: '100%'
	},
	logout__button: {
		[theme.breakpoints.down('xs')]: {
			height: 60,
			fontSize: '.7rem'
		}
	},
	buttonsContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		padding: '1%',
		margin: '0 auto',
		width: '90%'
	},
	image: {
		width: 150,
		[theme.breakpoints.down('xs')]: {
			width: 90
		}
	}
});

const checkout = (props) => {
	const { classes } = props;

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
						countPayPerImage={props.countPayPerImage}
						allImagesCost={props.allImagesCost}
						countFreePictures={props.countFreePictures}
						picturePrice={props.picturePrice}
						selectedImages={props.selectedImages}
						isCheckout={props.isCheckout}
					/>
				</div>
				<div className={classes.buttonsContainer}>
					<form
						className={classes.buttonContainer}
						action="https://jumprock.co/mail/peekpickpic"
						method="post"
					>
						<input
							style={{ display: 'none' }}
							type="text"
							name="message"
							value={`*** TYTUŁY ZDJĘĆ: "${props.allImagesTitles()}" *** WYBRANA OPCJA: "wszystkie zdjęcia" *** KOSZT: ${props.allImagesCost} zł ***`}
							placeholder="message"
							readOnly
						/>
						<Button
							variant="contained"
							size="small"
							type="submit"
							color="primary"
							className={[ classes.logout__button ].join(' ')}
							fullWidth
						>
							wybieram: wszystkie zdjęcia
						</Button>
						<input type="hidden" name="after" value="http://localhost:3000/confirmation" />
					</form>
					<div className={classes.buttonContainer}>
						<form
							className={classes.buttonContainer}
							action="https://jumprock.co/mail/peekpickpic"
							method="post"
						>
							<input
								style={{ display: 'none' }}
								type="text"
								name="message"
								value={`*** TYTUŁY ZDJĘĆ: "${getSelectedTitles().join(
									'" , "'
								)}" *** WYBRANA OPCJA: "darmowe + dodatkowe zdjęcia" *** KOSZT: ${props.countPayPerImage} zł ***`}
								placeholder="message"
								readOnly
							/>
							<Button
								variant="contained"
								size="small"
								type="submit"
								className={classes.logout__button}
								fullWidth
								color="secondary"
							>
								wybieram: darmowe + dodatkowe zdjęcia
							</Button>
							<input type="hidden" name="after" value="http://localhost:3000/confirmation" />
						</form>
					</div>
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
		</React.Fragment>
	);
};

export default withStyles(styles)(checkout);
