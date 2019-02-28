import React, { PureComponent } from 'react';
import Payment from '../../../../components/UserPanel/Payment/Payment';
import Checkout from '../../../../components/UserPanel/Checkout/Checkout';
import Filter from '../../../../components/UserPanel/Filter/Filter';
import { Paper, Typography, Avatar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';
import ChatBubble from '@material-ui/icons/ChatBubble';
import firebase from 'firebase/app';
import 'firebase/database';
import PropTypes from 'prop-types';

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
	state = {
		updatedImagesDataObj: null
	};

	componentDidMount() {
		const userNameDbElement = firebase.database().ref(this.props.userName);
		userNameDbElement.on('value', (snapshot) => {
			if (!snapshot.exists()) return;
			const updatedDataObj = snapshot.val();
			this.setState({ updatedImagesDataObj: updatedDataObj.images });
		});
	}

	allImagesTitlesHandler = () => {
		return this.state.updatedImagesDataObj ? Object.keys(this.state.updatedImagesDataObj).join('", "') : '';
	};

	selectedElementsAmount = (elementColor) => {
		let amountOfElement = 0;

		switch (elementColor) {
			case 'green':
				for (let imageTitle in this.state.updatedImagesDataObj) {
					if (this.state.updatedImagesDataObj[imageTitle].isClickedGreen === true) {
						amountOfElement++;
					}
				}
				return amountOfElement;
			case 'blue':
				for (let imageTitle in this.state.updatedImagesDataObj) {
					if (this.state.updatedImagesDataObj[imageTitle].isClickedBlue === true) amountOfElement++;
				}
				return amountOfElement;

			case 'red':
				for (let imageTitle in this.state.updatedImagesDataObj) {
					if (
						(this.state.updatedImagesDataObj[imageTitle].isClickedRed === false ||
							this.state.updatedImagesDataObj[imageTitle].isClickedRed === true) &&
						this.state.updatedImagesDataObj[imageTitle].isClickedGreen === false &&
						this.state.updatedImagesDataObj[imageTitle].isClickedBlue === false
					)
						amountOfElement++;
				}
				return amountOfElement;

			case 'orange':
				for (let imageTitle in this.state.updatedImagesDataObj) {
					if (this.state.updatedImagesDataObj[imageTitle].comment !== '') amountOfElement++;
				}
				return amountOfElement;

			case 'all':
				for (let everyPicture in this.state.updatedImagesDataObj) {
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

	filterButtonClickHandler = (whichButton) => {
		switch (whichButton) {
			case 'greenClicked':
				this.props.onFilterButtonsState(whichButton);
				break;

			case 'blueClicked':
				this.props.onFilterButtonsState(whichButton);
				break;

			case 'redClicked':
				this.props.onFilterButtonsState(whichButton);
				break;

			case 'orangeClicked':
				this.props.onFilterButtonsState(whichButton);
				break;

			default:
				break;
		}
	};

	render() {
		console.count('COUNTER');
		const { classes, filterButtonsState, isCheckout, picturePrice } = this.props;
		const filter = (buttonType) => {
			return <Filter filterClicked={buttonType} filterButtonsState={filterButtonsState} />;
		};
		let paymentOnCheckout = null;
		let paymentOnImagesSelect = null;
		if (!isCheckout) {
			paymentOnImagesSelect = (
				<React.Fragment>
					<Paper className={classes.paper}>
						<div
							className={classes.iconCaptionFilterContainer}
							onClick={() => this.filterButtonClickHandler('greenClicked')}
						>
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

							{filter('greenClicked')}
						</div>

						<div
							className={classes.iconCaptionFilterContainer}
							onClick={() => this.filterButtonClickHandler('blueClicked')}
						>
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
							{filter('blueClicked')}
						</div>

						<div
							className={classes.iconCaptionFilterContainer}
							onClick={() => this.filterButtonClickHandler('redClicked')}
						>
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
							{filter('redClicked')}
						</div>

						<div
							className={classes.iconCaptionFilterContainer}
							onClick={() => this.filterButtonClickHandler('orangeClicked')}
						>
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
							{filter('orangeClicked')}
						</div>
					</Paper>
					<Payment
						countPayPerImage={this.countPayPerImage(this.selectedElementsAmount('green'))}
						allImagesCost={this.allImagesCost()}
						countFreePictures={this.countFreePictures()}
						picturePrice={picturePrice}
						isCheckout={isCheckout}
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
					picturePrice={picturePrice}
					selectedImages={this.selectedElementsAmount('green')}
					isCheckout={isCheckout}
					imagesDataObj={this.state.updatedImagesDataObj}
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

Counter.propTypes = {
	FilterContext: PropTypes.bool,
	classes: PropTypes.object,
	discountProcent: PropTypes.any,
	freePicturesAmount: PropTypes.any,
	picturePrice: PropTypes.any,
	imagesDataObj: PropTypes.object,
	filterButtonsState: PropTypes.object,
	import: PropTypes.bool,
	isCheckout: PropTypes.bool,
	onFilterButtonsState: PropTypes.func,
	userName: PropTypes.string
};

export default withStyles(styles)(Counter);
