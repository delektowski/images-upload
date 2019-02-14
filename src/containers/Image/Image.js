import React, { PureComponent } from 'react';
import firebase from 'firebase/app';
import Swipe from 'react-easy-swipe';
import 'firebase/database';
import { updateImageState } from './utylity';
import { withStyles } from '@material-ui/core/styles';
import {
	Card,
	CardMedia,
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

const styles = (theme) => ({
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

class Image extends PureComponent {
	state = {
		containerColor: '',
		isClickedGreen: false,
		isClickedBlue: false,
		isClickedRed: false,
		isImageClicked: false,
		imageId: '',
		src: 'no-scr',
		expanded: false,
		comment: '',
		confirmedComment: false,
		isHover: false,
		touchStart: 0,
		touchEnd: 0
	};

	componentDidMount() {
		// Recognize state of the element based on Firebase data
		for (let key in this.props.imagesDataObj) {
			if (key === this.props.caption[0]) {
				let color = '';
				if (this.props.imagesDataObj[key].isClickedGreen) color = 'green';
				if (this.props.imagesDataObj[key].isClickedBlue) color = 'blue';
				if (this.props.imagesDataObj[key].isClickedRed) color = 'red';
				this.setState({
					containerColor: color,
					isClickedGreen: this.props.imagesDataObj[key].isClickedGreen,
					isClickedBlue: this.props.imagesDataObj[key].isClickedBlue,
					isClickedRed: this.props.imagesDataObj[key].isClickedRed,
					imageId: this.props.caption[0],
					src: this.props.src[0],
					comment: this.props.imagesDataObj[key].comment
				});
			}
		}
		if (this.props.isBiggerSize) {
			window.addEventListener('keydown', this.keyDownEvent, false);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.keyDownEvent, null);
	}

	componentDidUpdate() {
		if (this.props.imagesDataObj[this.state.imageId].isClickedGreen !== this.state.isClickedGreen) {
			this.setState({
				isClickedGreen: this.props.imagesDataObj[this.state.imageId].isClickedGreen,
				containerColor: this.props.imagesDataObj[this.state.imageId].containerColor
			});
		}
		if (this.props.imagesDataObj[this.state.imageId].isClickedBlue !== this.state.isClickedBlue) {
			this.setState({
				isClickedBlue: this.props.imagesDataObj[this.state.imageId].isClickedBlue,
				containerColor: this.props.imagesDataObj[this.state.imageId].containerColor
			});
		}
		if (this.props.imagesDataObj[this.state.imageId].isClickedRed !== this.state.isClickedRed) {
			this.setState({
				isClickedRed: this.props.imagesDataObj[this.state.imageId].isClickedRed,
				containerColor: this.props.imagesDataObj[this.state.imageId].containerColor
			});
		}
		if (
			(this.state.confirmedComment || !this.state.expanded) &&
			this.props.imagesDataObj[this.state.imageId].comment !== this.state.comment
		) {
			this.setState({
				comment: this.props.imagesDataObj[this.state.imageId].comment,
				confirmedComment: false
			});
		}

		if (this.state.touchStart > 0 && this.state.touchEnd > 0) {
			const touchLength = this.state.touchStart - this.state.touchEnd;

			if (touchLength < 0) {
				this.OnModalImageSelection('back');
			}

			if (touchLength > 0) {
				this.OnModalImageSelection('forward');
			}

			this.setState({
				touchStart: 0,
				touchEnd: 0
			});
		}
	}

	keyDownEvent = (keyDownEvent) => {
		switch (keyDownEvent.key) {
			case 'ArrowRight':
				this.OnModalImageSelection('forward');
				break;

			case 'ArrowLeft':
				this.OnModalImageSelection('back');
				break;

			default:
				break;
		}
	};

	handleExpandClick = () => {
		this.setState((state) => ({ expanded: !state.expanded }));
		if (window.innerWidth <= 600) {
			this.props.onHideMenu();
		}
	};

	buttonClickHandler = (buttonColor) => {
		switch (buttonColor) {
			case 'green':
				this.setState((prevState) => {
					let color = 'green';
					if (prevState.isClickedGreen === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/images/${this.state.imageId}`)
						.update(updateImageState(color, !prevState.isClickedGreen, false, false));

					return updateImageState(color, !prevState.isClickedGreen, false, false);
				});
				break;

			case 'blue':
				this.setState((prevState) => {
					let color = 'blue';
					if (prevState.isClickedBlue === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/images/${this.state.imageId}`)
						.update(updateImageState(color, false, !prevState.isClickedBlue, false));
					return updateImageState(color, false, !prevState.isClickedBlue, false);
				});
				break;

			case 'red':
				this.setState((prevState) => {
					let color = 'red';
					if (prevState.isClickedRed === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/images/${this.state.imageId}`)
						.update(updateImageState(color, false, false, !prevState.isClickedRed));
					return updateImageState(color, false, false, !prevState.isClickedRed);
				});
				break;

			default:
				break;
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

	OnModalImageSelection = (direction) => {
		const imagesArr = Object.keys(this.props.imagesDataObj);
		const lastIndex = imagesArr.length - 1;
		let index = imagesArr.indexOf(this.state.imageId);

		if (direction === 'forward' && index === lastIndex) {
			index = -1;
		}

		if (direction === 'back' && index === 0) {
			index = lastIndex + 1;
		}

		switch (direction) {
			case 'forward':
				const nextImageTitle = imagesArr[index + 1];
				const nextImageSrc = this.props.imagesDataObj[nextImageTitle].path;
				this.setState({ imageId: nextImageTitle, src: nextImageSrc });
				break;

			case 'back':
				const previousImageTitle = imagesArr[index - 1];
				const previousImageSrc = this.props.imagesDataObj[previousImageTitle].path;
				this.setState({ imageId: previousImageTitle, src: previousImageSrc });
				break;

			default:
				break;
		}
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

	onSwipeStart = (e) => {
		if (this.props.ImageClickedTitle) {
			this.setState({ touchStart: e.changedTouches[0].clientX });
		}
	};

	onSwipeEnd = (e) => {
		if (this.props.ImageClickedTitle) {
			this.setState({ touchEnd: e.changedTouches[0].clientX });
		}
	};

	render() {
		const { classes } = this.props;
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
		if (!this.props.isAdminLogin) {
			image = (
				<React.Fragment>
					<Card
						className={[ classes[cardColor], this.props.isBiggerSize ? classes.biggerCard : null ].join(
							' '
						)}
					>
						{this.props.ImageClickedTitle && !this.state.expanded ? (
							<React.Fragment>
								<Fade
									in={this.state.isHover}
									timeout={500}
									onMouseEnter={this.onHoverHandler}
									onMouseLeave={this.onHoverHandler}
								>
									<Fab className={classes.fabLeft} onClick={() => this.OnModalImageSelection('back')}>
										<ArrowBackIos />
									</Fab>
								</Fade>
								<Fade
									in={this.state.isHover}
									timeout={500}
									onMouseEnter={this.onHoverHandler}
									onMouseLeave={this.onHoverHandler}
								>
									<Fab
										className={classes.fabRight}
										onClick={() => this.OnModalImageSelection('forward')}
									>
										<ArrowForwardIos />
									</Fab>
								</Fade>
							</React.Fragment>
						) : null}
						<div className={classes[borderColor]}>
							<CardHeader subheader={this.state.imageId} className={classes.imageTitle} />
							<Swipe
								onSwipeStart={this.onSwipeStart}
								onSwipeMove={this.onSwipeMove}
								onSwipeEnd={this.onSwipeEnd}
							>
								<CardMedia
									// onMouseEnter={this.onHoverHandler}
									// onMouseLeave={this.onHoverHandler}
									component="img"
									onClick={() => this.props.onImageClick(this.state.imageId)}
									className={[
										classes.media,
										this.props.isBiggerSize ? classes.biggerMedia : null
									].join(' ')}
									src={this.state.src}
									title={this.state.imageId}
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

		return <React.Fragment>{image}</React.Fragment>;
	}
}

export default withStyles(styles)(Image);
