import React, { Component } from 'react';
// import ImageContainer from '../../components/Shared/ImageContainer/ImageContainer';
// import Button from '../../components/Shared/Button/Button';
// import Arrow from '../../components/Shared/Arrow/Arrow';
// import classes from './ImageLarge.module.scss';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import CardImage from './CardImage';

import firebase from 'firebase/app';
import 'firebase/database';
import { updateImageState, updateLargeImageState } from './utylity';

const styles = {
	widtha: {
		width: 'auto',
		display: 'flex',
		justifyContent: 'center',
		padding: 0
	},
	outside: {},
	paper: {
		background: 'blue'
	}
};

class ImageLarge extends Component {
	state = {
		imageLargeSrc: '',
		imageLargeId: '',
		imageLargeContainerColor: '',
		isClickedGreenImgLarge: false,
		isClickedBlueImgLarge: false,
		isClickedRedImgLarge: false,
		comment: '',
		open: false
	};

	componentDidMount() {
		this.setState({
			imageLargeSrc: this.props.imageLargeSrc,
			imageLargeId: this.props.imageLargeId,
			imageLargeContainerColor: this.props.imageLargeContainerColor,
			isClickedGreenImgLarge: this.props.isClickedGreenImgLarge,
			isClickedBlueImgLarge: this.props.isClickedBlueImgLarge,
			isClickedRedImgLarge: this.props.isClickedRedImgLarge,
			comment: this.props.comment
		});
	}

	buttonClickImgLargeHandler = (buttonColor) => {
		switch (buttonColor) {
			case 'green':
				this.setState((prevState) => {
					let color = 'green';
					if (prevState.isClickedGreenImgLarge === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/images/${this.state.imageLargeId}`)
						.update(updateImageState(color, !prevState.isClickedGreenImgLarge, false, false));

					return updateLargeImageState(color, !prevState.isClickedGreenImgLarge, false, false);
				});
				break;

			case 'blue':
				this.setState((prevState) => {
					let color = 'blue';
					if (prevState.isClickedBlueImgLarge === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/images/${this.state.imageLargeId}`)
						.update(updateImageState(color, false, !prevState.isClickedBlueImgLarge, false));
					return updateLargeImageState(color, false, !prevState.isClickedBlueImgLarge, false);
				});
				break;

			case 'red':
				this.setState((prevState) => {
					let color = 'red';
					if (prevState.isClickedRedImgLarge === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/images/${this.state.imageLargeId}`)
						.update(updateImageState(color, false, false, !prevState.isClickedRedImgLarge));
					return updateLargeImageState(color, false, false, !prevState.isClickedRedImgLarge);
				});
				break;

			default:
				break;
		}
	};

	arrowClickedHandler = (e) => {
		const direction = e.target.getAttribute('data-direction') === 'right' ? 1 : -1;
		const images = this.props.imagesDataObj;
		const imagesArr = Object.keys(this.props.imagesDataObj);
		let index = imagesArr.indexOf(this.state.imageLargeId);
		const lastIndex = imagesArr.length - 1;
		if (direction === 1 && index === lastIndex) index = -1;
		if (direction === -1 && index === 0) index = lastIndex + 1;
		const nextImageId = imagesArr[index + direction];
		console.log('comment', images[nextImageId].comment);

		this.setState({
			imageLargeSrc: images[nextImageId].path,
			imageLargeId: imagesArr[index + direction],
			imageLargeContainerColor: images[nextImageId].containerColor,
			isClickedGreenImgLarge: images[nextImageId].isClickedGreen,
			isClickedBlueImgLarge: images[nextImageId].isClickedBlue,
			isClickedRedImgLarge: images[nextImageId].isClickedRed,
			comment: images[nextImageId].comment
		});
	};

	onImageCommentHandler = (e) => {
		this.setState({
			comment: e.target.value
		});

		let field = e.target;
		field.style.height = 'inherit';
		let computed = field.scrollHeight;
		field.style.height = computed + 'px';
		console.log('computed', computed);
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		return (
			<React.Fragment>
				{/* <Arrow clicked={this.arrowClickedHandler} direction="left" />
				<ImageContainer
					containerColor={this.state.imageLargeContainerColor}
					containerLarge={this.props.isImageClicked}
				>
					<figure>
						<img
							onClick={this.props.clicked}
							className={[ classes.Image, classes.Image__large ].join(' ')}
							src={this.state.imageLargeSrc}
							alt={this.state.imageLargeId}
						/>
						<figcaption className={classes.Image__title}>{this.state.imageLargeId}</figcaption>
					</figure>
					{!this.props.isAdminLogin ? (
						<div className={classes.Image__selectionButtons}>
							<Button
								clicked={() => this.buttonClickImgLargeHandler('green')}
								buttonText="Tak"
								buttonColor="Button__green"
							/>
							<Button
								clicked={() => this.buttonClickImgLargeHandler('blue')}
								buttonText="Może"
								buttonColor="Button__blue"
							/>
							<Button
								clicked={() => this.buttonClickImgLargeHandler('red')}
								buttonText="Nie"
								buttonColor="Button__red"
							/>
						</div>
					) : null}
					<div className={classes.ImageLarge__comment}>
						<textarea
							className={[ classes.ImageLarge__comment_textArea ].join(' ')}
							value={this.state.comment}
							onChange={this.onImageCommentHandler}
						/>
						<div className={classes.Image__selectionButtons}>
							<Button
								clicked={() => this.props.onSaveComment(this.state.comment)}
								buttonText="Ok"
								buttonColor="Button__green"
							/>
							<Button
								// clicked={() => this.buttonClickImgLargeHandler('red')}
								buttonText="Anuluj"
								buttonColor="Button__red"
							/>
						</div>
					</div>
				</ImageContainer>
				<Arrow clicked={this.arrowClickedHandler} direction="right" /> */}
			</React.Fragment>
		);
	}
}

withStyles(styles)(ImageLarge);

{
	/* <div>
	<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
		Open alert dialog
	</Button>
	<Dialog
		maxWidth={'lg'}
		open={this.state.open}
		onClose={this.handleClose}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogContent className={classes.widtha}>
			<CardImage />
		</DialogContent>
	</Dialog>
</div>; */
}
