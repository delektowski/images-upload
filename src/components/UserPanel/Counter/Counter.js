import React, { PureComponent } from 'react';
import Payment from './Payment/Payment';
import Checkout from '../Checkout/Checkout';
import Filter from '../Filter/Filter';
import { Paper, Typography, Avatar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';
import ChatBubble from '@material-ui/icons/ChatBubble';

const styles = {
	paper: {
		background: 'whitesmoke',
		marginTop: 65,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 5
	},
	iconCaption: {
		fontSize: '.56rem'
	},
	iconCaptionFilterContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	iconCaptionContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 60
	},
	iconCaptionContainerBig: {
		width: 80
	},
	captionContainer: {
		display: 'flex',
		flexDirection: 'column'
	},
	avatar: {
		height: 30,
		width: 30
	},
	green: {
		color: 'green'
	},
	orange: {
		color: 'rgb(255,87,34)'
	},
	bgGreen: {
		background: 'green'
	},
	red: {
		color: 'rgb(0,0,0)'
	},
	bgRed: {
		background: 'rgb(0,0,0)'
	},
	bgOrange: {
		background: 'rgb(255,87,34)'
	},
	blue: {
		color: 'rgb(158, 158, 158)'
	},
	bgBlue: {
		background: 'rgb(158, 158, 158)'
	},
	white: {
		color: 'white'
	}
};

class Counter extends PureComponent {
	allImagesTitlesHandler = () => {
		return this.props.imagesDataObj ? Object.keys(this.props.imagesDataObj).join('", "') : '';
	};

	selectedElementsAmount = (elementColor) => {
		let amountOfElement = 0;

		switch (elementColor) {
			case 'green':
				for (let imageTitle in this.props.imagesDataObj) {
					if (this.props.imagesDataObj[imageTitle].isClickedGreen === true) {
						amountOfElement++;
					}
				}
				return amountOfElement;
			case 'blue':
				for (let imageTitle in this.props.imagesDataObj) {
					if (this.props.imagesDataObj[imageTitle].isClickedBlue === true) amountOfElement++;
				}
				return amountOfElement;

			case 'red':
				for (let imageTitle in this.props.imagesDataObj) {
					if (
						(this.props.imagesDataObj[imageTitle].isClickedRed === false ||
							this.props.imagesDataObj[imageTitle].isClickedRed === true) &&
						this.props.imagesDataObj[imageTitle].isClickedGreen === false &&
						this.props.imagesDataObj[imageTitle].isClickedBlue === false
					)
						amountOfElement++;
				}
				return amountOfElement;

			case 'orange':
				for (let imageTitle in this.props.imagesDataObj) {
					if (this.props.imagesDataObj[imageTitle].comment !== '') amountOfElement++;
				}
				return amountOfElement;

			case 'all':
				for (let everyPicture in this.props.imagesDataObj) {
					if (everyPicture) amountOfElement++;
				}

				return amountOfElement;

			default:
				return null;
		}
	};

	countPayPerImage = (howManySelected) => {
		const freePicturesAmount = this.props.freePicturesAmount;
		const picturePrice = this.props.picturePrice;
		if (howManySelected > freePicturesAmount) {
			return (howManySelected - freePicturesAmount) * picturePrice;
		}
		return 0;
	};

	allImagesCost = () => {
		const freePicturesAmount = this.props.freePicturesAmount;
		const amountAll = this.selectedElementsAmount('all');
		const picturePrice = this.props.picturePrice;
		const discount = (amountAll - freePicturesAmount) * picturePrice * (this.props.discountProcent / 100);
		let price = Math.round((amountAll - freePicturesAmount) * picturePrice - discount);
		if (price < 0) price = 0;
		return price;
	};

	countFreePictures = () => {
		const freePicturesAmount = this.props.freePicturesAmount;
		return freePicturesAmount - this.selectedElementsAmount('green') > 0
			? freePicturesAmount - this.selectedElementsAmount('green')
			: 0;
	};

	render() {
		console.count('COUNTER');
		const { classes } = this.props;

		let paymentOnCheckout = null;
		let paymentOnImagesSelect = null;
		if (!this.props.isCheckout) {
			paymentOnImagesSelect = (
				<React.Fragment>
					<Paper className={classes.paper}>
						<div className={classes.iconCaptionFilterContainer}>
							<div className={[ classes.iconCaptionContainer, classes.green ].join(' ')}>
								<div>
									<ThumbUpAlt />
									<Typography
										className={[ classes.iconCaption, classes.green ].join(' ')}
										variant="caption"
									>
										TAK
									</Typography>
								</div>
								<Avatar className={[ classes.avatar, classes.bgGreen ].join(' ')}>
									<Typography className={classes.white} variant="caption">
										{this.selectedElementsAmount('green')}
									</Typography>
								</Avatar>
							</div>
							<Filter
								onFilterButtonsState={this.props.onFilterButtonsState}
								filterClicked="greenClicked"
								filterButtonsState={this.props.filterButtonsState}
							/>
						</div>

						<div className={classes.iconCaptionFilterContainer}>
							<div className={[ classes.iconCaptionContainer, classes.blue ].join(' ')}>
								<div>
									<ThumbsUpDown />
									<Typography
										className={[ classes.iconCaption, classes.blue ].join(' ')}
										variant="caption"
									>
										MOŻE
									</Typography>
								</div>
								<Avatar className={[ classes.avatar, classes.bgBlue ].join(' ')}>
									<Typography className={classes.white} variant="caption">
										{this.selectedElementsAmount('blue')}
									</Typography>
								</Avatar>
							</div>
							<Filter
								onFilterButtonsState={this.props.onFilterButtonsState}
								filterClicked="blueClicked"
								filterButtonsState={this.props.filterButtonsState}
							/>
						</div>

						<div className={classes.iconCaptionFilterContainer}>
							<div className={[ classes.iconCaptionContainer, classes.red ].join(' ')}>
								<div>
									<ThumbDownAlt />
									<Typography
										className={[ classes.iconCaption, classes.red ].join(' ')}
										variant="caption"
									>
										NIE
									</Typography>
								</div>
								<Avatar className={[ classes.avatar, classes.bgRed ].join(' ')}>
									<Typography className={classes.white} variant="caption">
										{this.selectedElementsAmount('red')}
									</Typography>
								</Avatar>
							</div>
							<Filter
								onFilterButtonsState={this.props.onFilterButtonsState}
								filterClicked="redClicked"
								filterButtonsState={this.props.filterButtonsState}
							/>
						</div>

						<div className={classes.iconCaptionFilterContainer}>
							<div
								className={[
									classes.iconCaptionContainer,
									classes.iconCaptionContainerBig,
									classes.orange
								].join(' ')}
							>
								<div className={classes.captionContainer}>
									<ChatBubble style={{ margin: '0 auto' }} />
									<Typography
										className={[ classes.iconCaption, classes.orange ].join(' ')}
										variant="caption"
									>
										KOMENTARZ
									</Typography>
								</div>
								<Avatar className={[ classes.avatar, classes.bgOrange ].join(' ')}>
									<Typography className={classes.white} variant="caption">
										{this.selectedElementsAmount('orange')}
									</Typography>
								</Avatar>
							</div>
							<Filter
								onFilterButtonsState={this.props.onFilterButtonsState}
								filterButtonsState={this.props.filterButtonsState}
								filterClicked="orangeClicked"
							/>
						</div>
					</Paper>
					<Payment
						countPayPerImage={this.countPayPerImage(this.selectedElementsAmount('green'))}
						allImagesCost={this.allImagesCost()}
						countFreePictures={this.countFreePictures()}
						picturePrice={this.props.picturePrice}
						isCheckout={this.props.isCheckout}
					/>
				</React.Fragment>
			);
		}

		if (this.props.isCheckout) {
			paymentOnCheckout = (
				<Checkout
					countPayPerImage={this.countPayPerImage(this.selectedElementsAmount('green'))}
					allImagesCost={this.allImagesCost()}
					countFreePictures={this.countFreePictures()}
					picturePrice={this.props.picturePrice}
					selectedImages={this.selectedElementsAmount('green')}
					isCheckout={this.props.isCheckout}
					imagesDataObj={this.props.imagesDataObj}
					allImagesTitles={this.allImagesTitlesHandler}
				/>
			);
		}

		return (
			<React.Fragment>
				{paymentOnCheckout}
				{paymentOnImagesSelect}
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Counter);
