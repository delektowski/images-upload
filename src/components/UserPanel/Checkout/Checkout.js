import React from 'react';
import { Typography, Button } from '@material-ui/core/';
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
		width: '100%'
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
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		padding: '1%',
		margin: '0 auto',
		width: '90%',
		height: 60,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
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
							className={[ classes.logout__button ].join(' ')}
							fullWidth
							// onClick={(e) => this.onCreateUserHandler(e)}
						>
							<Typography variant="overline" />
							wszystkie zdjęcia
						</Button>
					</div>
					<div className={classes.buttonContainer}>
						<Button
							variant="contained"
							size="small"
							className={classes.logout__button}
							fullWidth
							color="secondary"
							// onClick={(e) => this.onCreateUserHandler(e)}
						>
							<Typography variant="overline" />
							darmowe + dodatkowe zdjęcia
						</Button>
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
