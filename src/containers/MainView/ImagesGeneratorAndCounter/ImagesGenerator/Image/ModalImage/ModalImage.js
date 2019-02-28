import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/database';
import {
	Card,
	Dialog,
	CardMedia,
	DialogContent,
	CardContent,
	CardActions,
	TextField,
	Collapse,
	IconButton,
	CardHeader,
	Fab,
	Fade
} from '@material-ui/core/';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import ChatBubble from '@material-ui/icons/ChatBubble';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import PropTypes from 'prop-types';

const styles = (theme) => ({
	widtha: {
		width: 'auto',
		height: 'auto',
		display: 'flex',
		justifyContent: 'center',
		padding: 0,
		overflow: 'hidden'
	},
	cardRed: {
		width: 400,
		margin: '1%',
		background: 'rgb(194, 194, 194)',
		transition: 'all .3s ease-in-out'
	},
	cardGreen: {
		width: 400,
		margin: '1%',
		background: 'rgb(229, 242, 229)',
		transition: 'all .3s ease-in-out'
	},
	cardBlue: {
		width: 400,
		margin: '1%',
		background: 'rgb(235, 235, 234)',
		transition: 'all .3s ease-in-out'
	},
	media: {
		maxWidth: '100%',
		padding: '0 3%',
		objectFit: 'contain',
		maxHeight: 250,
		margin: '0 auto'
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

class ModalImage extends PureComponent {
	state = {
		containerColor: '',
		isClickedGreen: false,
		isClickedBlue: false,
		isClickedRed: false,
		srcImageLarge: null,
		imageIdImageLarge: null,
		comment: '',
		isImageClicked: false,
		open: false,
		isHover: false
	};

	componentDidMount() {
		window.addEventListener('keydown', this.keyDownEvent, false);

		const userNameDbElement = firebase.database().ref(`${this.props.userName}/images/${this.props.getImageId}`);
		userNameDbElement.once('value', (snapshot) => {
			if (!snapshot.exists()) return;

			this.setState({
				containerColor: snapshot.val().containerColor,
				isClickedGreen: snapshot.val().isClickedGreen,
				isClickedBlue: snapshot.val().isClickedBlue,
				isClickedRed: snapshot.val().isClickedRed,
				srcImageLarge: this.props.getImageSrc,
				imageIdImageLarge: this.props.getImageId,
				comment: snapshot.val().comment
			});
		});
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.keyDownEvent, null);
	}

	updateImageState = (
		containerColor,
		isClickedGreen,
		isClickedBlue,
		isClickedRed,
		srcImageLarge,
		imageIdImageLarge,
		comment
	) => {
		if (srcImageLarge === undefined) {
			return {
				containerColor: containerColor,
				isClickedGreen: isClickedGreen,
				isClickedBlue: isClickedBlue,
				isClickedRed: isClickedRed
			};
		} else {
			return {
				containerColor: containerColor,
				isClickedGreen: isClickedGreen,
				isClickedBlue: isClickedBlue,
				isClickedRed: isClickedRed,
				srcImageLarge: srcImageLarge,
				imageIdImageLarge: imageIdImageLarge,
				comment: comment
			};
		}
	};

	checkContainerColor(whichImage) {
		if (this.props.imagesDataObj[whichImage].isClickedGreen) {
			return 'green';
		}
		if (this.props.imagesDataObj[whichImage].isClickedBlue) {
			return 'blue';
		}
		if (this.props.imagesDataObj[whichImage].isClickedRed) {
			return 'red';
		}
	}

	onModalImageSelectionHandler = (direction) => {
		const imagesArr = Object.keys(this.props.imagesDataObj);
		const lastIndex = imagesArr.length - 1;
		let index = null;
		let userNameDbElement;
		index = imagesArr.indexOf(this.state.imageIdImageLarge);

		if (direction === 'forward' && index === lastIndex) {
			index = -1;
		}

		if (direction === 'back' && index === 0) {
			index = lastIndex + 1;
		}

		switch (direction) {
			case 'forward':
				const nextImageTitle = imagesArr[index + 1];
				userNameDbElement = firebase.database().ref(`${this.props.userName}/images/${nextImageTitle}`);

				userNameDbElement.once('value', (snapshot) => {
					if (!snapshot.exists()) return;

					this.setState({
						containerColor: snapshot.val().containerColor,
						isClickedGreen: snapshot.val().isClickedGreen,
						isClickedBlue: snapshot.val().isClickedBlue,
						isClickedRed: snapshot.val().isClickedRed,
						srcImageLarge: snapshot.val().path,
						imageIdImageLarge: nextImageTitle,
						comment: snapshot.val().comment
					});
				});
				break;

			case 'back':
				const previousImageTitle = imagesArr[index - 1];
				userNameDbElement = firebase.database().ref(`${this.props.userName}/images/${previousImageTitle}`);

				userNameDbElement.once('value', (snapshot) => {
					if (!snapshot.exists()) return;

					this.setState({
						containerColor: snapshot.val().containerColor,
						isClickedGreen: snapshot.val().isClickedGreen,
						isClickedBlue: snapshot.val().isClickedBlue,
						isClickedRed: snapshot.val().isClickedRed,
						srcImageLarge: snapshot.val().path,
						imageIdImageLarge: previousImageTitle,
						comment: snapshot.val().comment
					});
				});
				break;

			default:
				break;
		}
	};

	keyDownEvent = (keyDownEvent) => {
		switch (keyDownEvent.key) {
			case 'ArrowRight':
				this.onModalImageSelectionHandler('forward');
				break;

			case 'ArrowLeft':
				this.onModalImageSelectionHandler('back');
				break;

			default:
				break;
		}
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	onCommentHandler = (e) => {
		const comment = e.target.value;
		this.setState({ comment: comment });
	};

	onCancelCommentHandler = () => {
		this.props.handleExpandClick();
	};

	onConfirmCommentHandler = () => {
		firebase
			.database()
			.ref(`${this.props.userName}/images/${this.state.imageIdImageLarge}`)
			.update({ comment: this.state.comment });
		this.setState({ confirmedComment: true });
		this.props.handleExpandClick();
	};

	onHoverHandler = (event) => {
		switch (event.type) {
			case 'mouseenter':
				this.setState({ isHover: true });
				break;

			case 'mouseleave':
				this.setState({ isHover: false });
				break;

			default:
				this.setState({ isHover: true });
				break;
		}
	};

	updateImageFirebase = (containerColor, isClickedGreen, isClickedBlue, isClickedRed) => {
		firebase
			.database()
			.ref(`${this.props.userName}/images/${this.state.imageIdImageLarge}`)
			.update(this.updateImageState(containerColor, isClickedGreen, isClickedBlue, isClickedRed));
	};

	buttonClickHandler = (buttonColor) => {
		switch (buttonColor) {
			case 'green':
				this.setState((prevState) => {
					let color = 'green';

					if (prevState.isClickedGreen === true && prevState.isClickedBlue === false) {
						color = '';
						this.updateImageFirebase(color, false, false, true);

						return this.updateImageState(color, false, false, true);
					} else if (prevState.isClickedGreen === false) {
						this.updateImageFirebase(color, !prevState.isClickedGreen, false, false);
						return this.updateImageState(color, !prevState.isClickedGreen, false, false);
					}
				});
				break;

			case 'blue':
				this.setState((prevState) => {
					let color = 'blue';

					if (prevState.isClickedBlue === true && prevState.isClickedGreen === false) {
						color = '';
						this.updateImageFirebase(color, false, false, true);
						return this.updateImageState(color, false, false, true);
					} else if (prevState.isClickedBlue === false) {
						this.updateImageFirebase(color, false, !prevState.isClickedBlue, false);
						return this.updateImageState(color, false, !prevState.isClickedBlue, false);
					}
				});
				break;

			case 'red':
				this.setState(() => {
					const color = '';
					this.updateImageFirebase(color, false, false, true);
					return this.updateImageState(color, false, false, true);
				});
				break;

			default:
				break;
		}
	};

	render() {
		console.count('MODALIMAGE');
		const { classes, isImageLarge, onImageLargeClose, handleExpandClick, isExpanded } = this.props;
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

		return (
			<div>
				<Dialog
					maxWidth={'md'}
					scroll="body"
					open={isImageLarge}
					onClose={onImageLargeClose}
					PaperProps={{
						style: {
							width: 750,
							position: 'fixed',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)'
						}
					}}
					PaperComponent="div"
				>
					<DialogContent style={{ padding: 0 }} className={classes.widtha}>
						<Card
							onMouseEnter={this.onHoverHandler}
							onMouseLeave={this.onHoverHandler}
							className={[ classes[cardColor], classes.biggerCard ].join(' ')}
						>
							<React.Fragment>
								<Fade in={this.state.isHover} timeout={200}>
									<Fab
										className={classes.fabLeft}
										onClick={() => this.onModalImageSelectionHandler('back')}
									>
										<ArrowBackIos />
									</Fab>
								</Fade>
								<Fade in={this.state.isHover} timeout={200}>
									<Fab
										className={classes.fabRight}
										onClick={() => this.onModalImageSelectionHandler('forward')}
									>
										<ArrowForwardIos />
									</Fab>
								</Fade>
							</React.Fragment>
							<div className={classes[borderColor]}>
								<CardHeader subheader={this.state.imageIdImageLarge} className={classes.imageTitle} />
								<CardMedia
									onMouseMove={this.onHoverHandler}
									component="img"
									className={[ classes.media, classes.biggerMedia ].join(' ')}
									src={this.state.srcImageLarge}
									title={this.state.imageIdImageLarge}
								/>
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
										onClick={handleExpandClick}
										aria-expanded={isExpanded}
										aria-label="Show more"
									>
										{isExpanded ? <ExpandLess /> : commentIcon}
									</IconButton>
								</CardActions>
								<Collapse in={isExpanded} timeout="auto" unmountOnExit>
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
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

ModalImage.propTypes = {
	classes: PropTypes.object,
	caption: PropTypes.string,
	getImageId: PropTypes.string,
	getImageSrc: PropTypes.string,
	handleExpandClick: PropTypes.func,
	imagesDataObj: PropTypes.object,
	isExpanded: PropTypes.bool,
	isImageLarge: PropTypes.bool,
	onImageLargeClose: PropTypes.func,
	userName: PropTypes.string
};

export default withStyles(styles)(ModalImage);
