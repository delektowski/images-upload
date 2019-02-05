import React, { Component } from 'react';

// import ImageLarge from '../ImageLarge/ImageLarge';
import firebase from 'firebase/app';
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
	CardHeader
} from '@material-ui/core/';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';

const styles = {
	cardRed: {
		width: 400,
		minWidth: 350,
		margin: '1%',
		background: 'rgba(98, 95, 90, 0.1)',
		transition: 'all .3s ease-in-out'
	},
	cardGreen: {
		width: 400,
		margin: '1%',
		background: 'rgba(0, 128, 0, 0.1)',
		transition: 'all .3s ease-in-out'
	},
	cardBlue: {
		width: 400,
		margin: '1%',
		background: 'rgba(63, 81, 181, 0.2)',
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
		border: '4px solid rgba(98, 95, 90, 0.707)',
		transition: 'all .3s ease-in-out'
	},
	borderGreen: {
		border: '4px solid rgba(0, 128, 0)',
		transition: 'all .3s ease-in-out'
	},
	borderBlue: {
		border: '4px solid rgba(63, 81, 181)',
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
		color: 'rgba(63, 81, 181)',
		transition: 'all .3s ease-in-out'
	},
	thumbDownAlt: {
		color: 'rgba(98, 95, 90, 0.307)',
		transition: 'all .3s ease-in-out'
	},
	buttonsContainer: {
		display: 'flex',
		justifyContent: 'space-around'
	}
};

class Image extends Component {
	state = {
		containerColor: '',
		isClickedGreen: false,
		isClickedBlue: false,
		isClickedRed: false,
		isImageClicked: false,
		imageId: '',
		expanded: false,
		comment: ''
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
					comment: this.props.imagesDataObj[key].comment
				});
			}
		}
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
	}

	ImageClickedHandler = () => {
		this.setState((prevState) => {
			return {
				isImageClicked: !prevState.isImageClicked
			};
		});
		this.props.onImageClick();
	};

	// onSaveCommentHandler = (comment) => {
	// 	firebase.database().ref(`${this.props.userName}/images/${this.state.imageId}`).update({ comment: comment });
	// };

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
		this.handleExpandClick();
	};
	render() {
		const { classes } = this.props;
		let imageLarge = null;
		let image = null;
		let borderColor = 'borderRed';
		let cardColor = 'cardRed';
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

		// if (this.state.isImageClicked) {
		// 	imageLarge = (
		// 		<ImageLarge
		// 			imageLargeSrc={this.props.src}
		// 			imageLargeId={this.state.imageId}
		// 			imageLargeContainerColor={this.state.containerColor}
		// 			isClickedGreenImgLarge={this.state.isClickedGreen}
		// 			isClickedBlueImgLarge={this.state.isClickedBlue}
		// 			isClickedRedImgLarge={this.state.isClickedRed}
		// 			isImageClicked={this.state.isImageClicked}
		// 			clicked={this.ImageClickedHandler}
		// 			imagesDataObj={this.props.imagesDataObj}
		// 			userName={this.props.userName}
		// 			onImageComment={this.onImageCommentHandler}
		// 			comment={this.state.comment}
		// 			onSaveComment={this.onSaveCommentHandler}
		// 		/>
		// 	);
		// }
		if (!this.props.isAdminLogin) {
			image = (
				<React.Fragment>
					<Card className={classes[cardColor]}>
						<div className={classes[borderColor]}>
							<CardHeader subheader={this.state.imageId} className={classes.imageTitle} />
							<CardMedia
								component="img"
								onClick={() => console.log('kokos')}
								className={classes.media}
								src={this.props.src[0]}
								title={this.state.imageId}
							/>
							<CardActions className={classes.actions}>
								<IconButton onClick={() => this.buttonClickHandler('green')}>
									<ThumbUpAlt className={this.state.isClickedGreen ? classes.thumbUpAlt : null} />
								</IconButton>
								<IconButton onClick={() => this.buttonClickHandler('blue')}>
									<ThumbsUpDown className={this.state.isClickedBlue ? classes.thumbsUpDown : null} />
								</IconButton>
								<IconButton onClick={() => this.buttonClickHandler('red')}>
									<ThumbDownAlt className={this.state.borderRed ? classes.thumbDownAlt : null} />
								</IconButton>
								<IconButton
									onClick={this.handleExpandClick}
									aria-expanded={this.state.expanded}
									aria-label="Show more"
								>
									{this.state.expanded ? <ExpandLess /> : <ChatBubbleOutline />}
								</IconButton>
							</CardActions>
							<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
								<CardContent>
									<TextField
										id="outlined-textarea"
										label="Komentarz"
										placeholder="Komentarz"
										multiline
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

		return (
			<React.Fragment>
				{image}
				{/* {imageLarge} */}
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Image);
