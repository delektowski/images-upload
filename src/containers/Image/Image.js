import React, { Component } from 'react';
import classes from './Image.module.scss';
import Button from '../../components/Shared/Button/Button';
import ImageLarge from '../ImageLarge/ImageLarge';
import ImageContainer from '../../components/Shared/ImageContainer/ImageContainer';
import firebase from 'firebase/app';
import 'firebase/database';
import { updateImageState } from './utylity';

class Image extends Component {
	state = {
		containerColor: '',
		isClickedGreen: false,
		isClickedBlue: false,
		isClickedRed: false,
		isImageClicked: false,
		imageId: '',
		comment: ''
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

	onSaveCommentHandler = (comment) => {
		firebase.database().ref(`${this.props.userName}/images/${this.state.imageId}`).update({ comment: comment });
	};

	render() {
		let imageLarge = null;
		if (this.state.isImageClicked) {
			imageLarge = (
				<ImageLarge
					imageLargeSrc={this.props.src}
					imageLargeId={this.state.imageId}
					imageLargeContainerColor={this.state.containerColor}
					isClickedGreenImgLarge={this.state.isClickedGreen}
					isClickedBlueImgLarge={this.state.isClickedBlue}
					isClickedRedImgLarge={this.state.isClickedRed}
					isImageClicked={this.state.isImageClicked}
					clicked={this.ImageClickedHandler}
					imagesDataObj={this.props.imagesDataObj}
					userName={this.props.userName}
					onImageComment={this.onImageCommentHandler}
					comment={this.state.comment}
					onSaveComment={this.onSaveCommentHandler}
				/>
			);
		}

		return (
			<React.Fragment>
				<ImageContainer containerColor={this.state.containerColor}>
					<figure>
						<img
							onClick={this.ImageClickedHandler}
							className={classes.Image}
							src={this.props.src}
							alt={this.state.imageId}
						/>
						<figcaption className={classes.Image__title}>{this.state.imageId}</figcaption>
					</figure>
					{!this.props.isAdminLogin ? (
						<div className={classes.Image__selectionButtons}>
							<Button
								clicked={() => this.buttonClickHandler('green')}
								buttonText="Tak"
								buttonColor="Button__green"
							/>
							<Button
								clicked={() => this.buttonClickHandler('blue')}
								buttonText="Może"
								buttonColor="Button__blue"
							/>
							<Button
								clicked={() => this.buttonClickHandler('red')}
								buttonText="Nie"
								buttonColor="Button__red"
							/>
						</div>
					) : null}
				</ImageContainer>
				{imageLarge}
			</React.Fragment>
		);
	}
}

export default Image;
