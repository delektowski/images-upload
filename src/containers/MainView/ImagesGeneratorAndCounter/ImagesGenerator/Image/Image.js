import React, { PureComponent } from 'react';
import ModalImage from './ModalImage/ModalImage';
import firebase from 'firebase/app';
import 'firebase/database';
import { withStyles } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	TextField,
	Collapse,
	IconButton,
	CardHeader
} from '@material-ui/core/';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import ChatBubble from '@material-ui/icons/ChatBubble';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import Swipe from 'react-easy-swipe';
import FilterContext from '../../../../../context/filter-context';

const styles = (theme) => ({
	cardRed: {
		width: 400,
		margin: '1%',
		background: 'rgb(194, 194, 194)',
		transition: 'all .3s ease-in-out',
		textAlign: 'center'
	},
	cardGreen: {
		width: 400,
		margin: '1%',
		background: 'rgb(229, 242, 229)',
		transition: 'all .3s ease-in-out',
		textAlign: 'center'
	},
	cardBlue: {
		width: 400,
		margin: '1%',
		background: 'rgb(235, 235, 234)',
		transition: 'all .3s ease-in-out',
		textAlign: 'center'
	},
	media: {
		maxWidth: '100%',
		objectFit: 'contain',
		maxHeight: 250
	},
	actions: {
		display: 'flex',
		justifyContent: 'space-around'
	},
	borderRed: {
		border: '4px solid rgb(73, 73, 73)',
		transition: 'all .3s ease-in-out'
	},
	borderGreen: {
		border: '4px solid rgba(0, 128, 0)',
		transition: 'all .3s ease-in-out'
	},
	borderBlue: {
		border: '4px solid rgb(235, 235, 234)',
		transition: 'all .3s ease-in-out'
	},
	imageTitle: {
		textAlign: 'center',
		padding: '2%'
	},
	textField: {
		width: '100%'
	},
	thumbUpAlt: {
		color: 'rgba(0, 128, 0)',
		transition: 'all .3s ease-in-out'
	},
	thumbsUpDown: {
		color: 'rgb(158, 158, 158)',
		transition: 'all .3s ease-in-out'
	},
	thumbDownAlt: {
		color: 'rgb(0, 0, 0)',
		transition: 'all .3s ease-in-out'
	},
	buttonsContainer: {
		display: 'flex',
		justifyContent: 'space-around'
	},
	biggerMedia: {
		maxHeight: 450,
		[theme.breakpoints.down('xs')]: {
			maxHeight: 200
		}
	},
	biggerCard: {
		width: 750,
		margin: 0
	},
	fabLeft: {
		position: 'absolute',
		top: '48%',
		transform: 'translateY(-50%)',
		left: 70,
		background: 'rgba(213, 213, 213, 0.5)'
	},
	fabRight: {
		position: 'absolute',
		top: '48%',
		transform: 'translateY(-50%)',
		right: 70,
		background: 'rgba(213, 213, 213, 0.5)'
	},
	orange: {
		color: 'rgb(255,87,34)'
	}
});

class Image extends PureComponent {
	state = {
		containerColor: '',
		isClickedGreen: false,
		isClickedBlue: false,
		isClickedRed: false,
		comment: '',
		isImageClicked: false,
		imageId: '',
		src: null,
		expanded: false,
		confirmedComment: false,
		isImageLarge: false
	};

	static contextType = FilterContext;

	componentDidUpdate() {
		const turnOnDatabaseListen = () => {
			const userNameDbElement = firebase.database().ref(`${this.props.userName}/images/${this.props.caption[0]}`);
			userNameDbElement.on('value', (snapshot) => {
				if (!snapshot.exists()) return;

				if (!this.state.confirmedComment) {
					this.setState({
						containerColor: snapshot.val().containerColor,
						isClickedGreen: snapshot.val().isClickedGreen,
						isClickedBlue: snapshot.val().isClickedBlue,
						isClickedRed: snapshot.val().isClickedRed
					});
				}

				if (this.state.confirmedComment) {
					this.setState({
						containerColor: snapshot.val().containerColor,
						isClickedGreen: snapshot.val().isClickedGreen,
						isClickedBlue: snapshot.val().isClickedBlue,
						isClickedRed: snapshot.val().isClickedRed,
						comment: snapshot.val().comment,
						confirmedComment: false
					});
				}

				if (!this.state.confirmedComment && this.state.isImageLarge) {
					this.setState({
						containerColor: snapshot.val().containerColor,
						isClickedGreen: snapshot.val().isClickedGreen,
						isClickedBlue: snapshot.val().isClickedBlue,
						isClickedRed: snapshot.val().isClickedRed,
						comment: snapshot.val().comment
					});
				}
				if (!this.state.confirmedComment && !this.state.isImageLarge && !this.state.expanded) {
					this.setState({
						containerColor: snapshot.val().containerColor,
						isClickedGreen: snapshot.val().isClickedGreen,
						isClickedBlue: snapshot.val().isClickedBlue,
						isClickedRed: snapshot.val().isClickedRed,
						comment: snapshot.val().comment
					});
				}
			});
		};

		turnOnDatabaseListen();
	}

	componentDidMount() {
		// console.log('this.context', this.context.filterButtonsState.greenClicked);

		let color = this.checkContainerColor();

		this.setState({
			containerColor: color,
			isClickedGreen: this.props.imagesDataObj[this.props.caption[0]].isClickedGreen,
			isClickedBlue: this.props.imagesDataObj[this.props.caption[0]].isClickedBlue,
			isClickedRed: this.props.imagesDataObj[this.props.caption[0]].isClickedRed,
			imageId: this.props.caption[0],
			src: this.props.src[0],
			comment: this.props.imagesDataObj[this.props.caption[0]].comment
		});
	}

	componentWillUnmount() {
		firebase.database().ref(`${this.props.userName}/images/${this.props.caption[0]}`).off();
	}

	checkContainerColor() {
		if (this.props.imagesDataObj[this.props.caption[0]].isClickedGreen) {
			return 'green';
		}
		if (this.props.imagesDataObj[this.props.caption[0]].isClickedBlue) {
			return 'blue';
		}
		if (this.props.imagesDataObj[this.props.caption[0]].isClickedRed) {
			return 'red';
		}
	}

	updateImageState = (containerColor, isClickedGreen, isClickedBlue, isClickedRed) => {
		return {
			containerColor: containerColor,
			isClickedGreen: isClickedGreen,
			isClickedBlue: isClickedBlue,
			isClickedRed: isClickedRed
		};
	};

	updateImageFirebase = (containerColor, isClickedGreen, isClickedBlue, isClickedRed) => {
		firebase
			.database()
			.ref(`${this.props.userName}/images/${this.state.imageId}`)
			.update(this.updateImageState(containerColor, isClickedGreen, isClickedBlue, isClickedRed));
	};

	handleExpandClick = () => {
		this.setState((state) => ({ expanded: !state.expanded }));
		if (window.innerWidth <= 600) {
			this.props.onHideMenu();
		}
	};

	buttonClickHandler = (buttonColor) => {
		if (!this.state.isImageLarge) {
			let color;
			switch (buttonColor) {
				case 'green':
					color = 'green';
					if (this.state.isClickedGreen === true && this.state.isClickedBlue === false) {
						color = '';
						this.updateImageFirebase(color, false, false, true);
					} else if (this.state.isClickedGreen === false) {
						this.updateImageFirebase(color, true, false, false);
					}
					break;

				case 'blue':
					color = 'blue';
					if (this.state.isClickedBlue === true && this.state.isClickedGreen === false) {
						color = '';
						this.updateImageFirebase(color, false, false, true);
					} else if (this.state.isClickedBlue === false) {
						this.updateImageFirebase(color, false, true, false);
					}
					break;

				case 'red':
					color = '';
					this.updateImageFirebase(color, false, false, true);
					break;

				default:
					break;
			}
		}
	};

	onCommentHandler = (e) => {
		const comment = e.target.value;
		this.setState({ comment: comment });
	};

	onCancelCommentHandler = () => {
		this.handleExpandClick();
	};

	onConfirmCommentHandler = () => {
		firebase
			.database()
			.ref(`${this.props.userName}/images/${this.state.imageId}`)
			.update({ comment: this.state.comment });
		this.setState({ confirmedComment: true });
		this.handleExpandClick();
	};

	onIsImageLargeHandler = () => {
		this.setState((prevState) => {
			return {
				isImageLarge: !prevState.isImageLarge
			};
		});
	};

	checkIfImagePassFilter = () => {
		return (
			(!this.props.isAdminLogin &&
				this.state.src &&
				((this.context.filterButtonsState.greenClicked && this.state.isClickedGreen) ||
					(this.context.filterButtonsState.blueClicked && this.state.isClickedBlue) ||
					(this.context.filterButtonsState.redClicked && this.state.isClickedRed))) ||
			(this.context.filterButtonsState.orangeClicked && this.state.comment)
		);
	};

	render() {
		console.log('image');
		const { classes } = this.props;
		let modalImage = null;
		let image = null;
		let borderColor = 'borderRed';
		let cardColor = 'cardRed';
		let commentIcon = <ChatBubbleOutline />;

		if (this.state.comment) {
			commentIcon = <ChatBubble className={classes.orange} />;
		}

		if (this.state.isClickedRed) {
			borderColor = 'borderRed';
			cardColor = 'cardRed';
		}
		if (this.state.isClickedGreen) {
			borderColor = 'borderGreen';
			cardColor = 'cardGreen';
		}
		if (this.state.isClickedBlue) {
			borderColor = 'borderBlue';
			cardColor = 'cardBlue';
		}

		if (this.checkIfImagePassFilter()) {
			image = (
				<React.Fragment>
					<Card className={classes[cardColor]}>
						<div className={classes[borderColor]}>
							<CardHeader subheader={this.state.imageId} className={classes.imageTitle} />
							<Swipe
								onSwipeStart={this.onSwipeStart}
								onSwipeMove={this.onSwipeMove}
								onSwipeEnd={this.onSwipeEnd}
							>
								{/* <CardMedia
									component="img"
									onClick={this.onIsImageLargeHandler}
									className={classes.media}
									src={this.state.src}
									title={this.state.imageId}
								/> */}

								<LazyLoadImage
									afterLoad={() => console.log('afterLoadText')}
									beforeLoad={() => console.log('beforeLoadText')}
									alt="kokos"
									onClick={this.onIsImageLargeHandler}
									className={classes.media}
									src={this.state.src} // use normal <img> attributes as props
									effect="opacity"
								/>
							</Swipe>

							<CardActions className={classes.actions}>
								<IconButton onClick={() => this.buttonClickHandler('green')}>
									<ThumbUpAlt
										className={
											this.state.isClickedGreen && !this.state.isClickedRed ? (
												classes.thumbUpAlt
											) : null
										}
									/>
								</IconButton>
								<IconButton onClick={() => this.buttonClickHandler('blue')}>
									<ThumbsUpDown
										className={
											this.state.isClickedBlue && !this.state.isClickedRed ? (
												classes.thumbsUpDown
											) : null
										}
									/>
								</IconButton>
								<IconButton onClick={() => this.buttonClickHandler('red')}>
									<ThumbDownAlt
										className={
											!this.state.isClickedGreen && !this.state.isClickedBlue ? (
												classes.thumbDownAlt
											) : null
										}
									/>
								</IconButton>
								<IconButton
									onClick={this.handleExpandClick}
									aria-expanded={this.state.expanded}
									aria-label="Show more"
								>
									{this.state.expanded ? <ExpandLess /> : commentIcon}
								</IconButton>
							</CardActions>
							<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
								<CardContent>
									<TextField
										id="outlined-textarea"
										label="Komentarz"
										placeholder="Komentarz"
										multiline
										rowsMax="4"
										onChange={this.onCommentHandler}
										value={this.state.comment}
										className={classes.textField}
										margin="normal"
										variant="outlined"
									/>
									<div className={classes.buttonsContainer}>
										<IconButton onClick={this.onCancelCommentHandler}>
											<Cancel />
										</IconButton>
										<IconButton onClick={this.onConfirmCommentHandler}>
											<CheckCircle />
										</IconButton>
									</div>
								</CardContent>
							</Collapse>
						</div>
					</Card>
				</React.Fragment>
			);
		}

		if (this.state.isImageLarge) {
			modalImage = (
				<React.Fragment>
					<ModalImage
						isImageLarge={this.state.isImageLarge}
						onImageLargeClose={this.onIsImageLargeHandler}
						imageIdImageLarge={this.state.imageIdImageLarge}
						onSwipeStart={this.onSwipeStart}
						onSwipeMove={this.onSwipeMove}
						onSwipeEnd={this.onSwipeEnd}
						isExpanded={this.state.expanded}
						userName={this.props.userName}
						handleExpandClick={this.handleExpandClick}
						getImageSrc={this.state.src}
						getImageId={this.state.imageId}
						imagesDataObj={this.props.imagesDataObj}
						caption={this.props.caption[0]}
					/>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				{image}

				{modalImage}
			</React.Fragment>
		);
	}
}

export default trackWindowScroll(withStyles(styles)(Image));
