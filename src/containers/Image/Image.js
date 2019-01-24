import React, { Component } from 'react';
import classes from './Image.module.scss';
import Button from '../../components/Shared/Button/Button';
import Arrow from '../../components/Shared/Arrow/Arrow';
import ImageContainer from '../../components/Shared/ImageContainer/ImageContainer';
import firebase from 'firebase/app';
import 'firebase/database';
import { updateImageState, updateLargeImageState } from './utylity';

class Image extends Component {
	state = {
		containerColor: '',
		isClickedGreen: false,
		isClickedBlue: false,
		isClickedRed: false,
		isImageClicked: false,
		ImageLargeSrc: '',
		ImageLargeId: '',
		ImageLargeContainerColor: '',
		isClickedGreenImgLarge: false,
		isClickedBlueImgLarge: false,
		isClickedRedImgLarge: false,
		imageId: ''
	};

	buttonClickHandler = (buttonColor) => {
		switch (buttonColor) {
			case 'green':
				this.setState((prevState) => {
					let color = 'green';
					if (prevState.isClickedGreen === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/${this.state.imageId}`)
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
						.ref(`${this.props.userName}/${this.state.imageId}`)
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
						.ref(`${this.props.userName}/${this.state.imageId}`)
						.update(updateImageState(color, false, false, !prevState.isClickedRed));
					return updateImageState(color, false, false, !prevState.isClickedRed);
				});
				break;
			default:
				break;
		}
	};

	buttonClickImgLargeHandler = (buttonColor) => {
		switch (buttonColor) {
			case 'green':
				this.setState((prevState) => {
					let color = 'green';
					if (prevState.isClickedGreenImgLarge === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/${this.state.ImageLargeId}`)
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
						.ref(`${this.props.userName}/${this.state.ImageLargeId}`)
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
						.ref(`${this.props.userName}/${this.state.ImageLargeId}`)
						.update(updateImageState(color, false, false, !prevState.isClickedRedImgLarge));
					return updateLargeImageState(color, false, false, !prevState.isClickedRedImgLarge);
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
					imageId: this.props.caption[0]
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

	ImageClickedHandler = (e) => {
		const ImageLargeSrc = e.target.getAttribute('src');
		const ImageLargeId = e.target.getAttribute('alt');

		this.setState((prevState) => {
			return {
				isImageClicked: !prevState.isImageClicked,
				ImageLargeSrc: ImageLargeSrc,
				ImageLargeId: ImageLargeId,
				ImageLargeContainerColor: prevState.containerColor,
				isClickedGreenImgLarge: prevState.isClickedGreen,
				isClickedBlueImgLarge: prevState.isClickedBlue,
				isClickedRedImgLarge: prevState.isClickedRed
			};
		});
		this.props.onImageClick();
	};
	arrowClickedHandler = (e) => {
		const direction = e.target.getAttribute('data-direction') === 'right' ? 1 : -1;
		const images = this.props.imagesDataObj;
		const imagesArr = Object.keys(images);
		let index = this.state.ImageLargeId
			? imagesArr.indexOf(this.state.ImageLargeId)
			: imagesArr.indexOf(this.state.imageId);
		const lastIndex = imagesArr.length - 1;
		if (direction === 1 && index === lastIndex) index = -1;
		if (direction === -1 && index === 0) index = lastIndex + 1;
		const nextImageId = imagesArr[index + direction];
		const nextImageSrc = images[nextImageId].path;
		const nextImageContainerColor = images[nextImageId].containerColor;
		const nextImageButtonGreen = images[nextImageId].isClickedGreen;
		const nextImageButtonBlue = images[nextImageId].isClickedBlue;
		const nextImageButtonRed = images[nextImageId].isClickedRed;

		this.setState({
			ImageLargeSrc: nextImageSrc,
			ImageLargeId: nextImageId,
			ImageLargeContainerColor: nextImageContainerColor,
			isClickedGreenImgLarge: nextImageButtonGreen,
			isClickedBlueImgLarge: nextImageButtonBlue,
			isClickedRedImgLarge: nextImageButtonRed
		});
	};

	render() {
		let imageLarge = null;
		if (this.state.isImageClicked) {
			imageLarge = (
				<React.Fragment>
					<Arrow clicked={this.arrowClickedHandler} direction="left" />
					<ImageContainer
						containerColor={this.state.ImageLargeContainerColor}
						containerLarge={this.state.isImageClicked}
					>
						<figure>
							<img
								onClick={this.ImageClickedHandler}
								className={[ classes.Image, classes.Image__large ].join(' ')}
								src={this.state.ImageLargeSrc}
								alt={this.state.ImageLargeId}
							/>
							<figcaption className={classes.Image__title}>{this.state.ImageLargeId}</figcaption>
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
					</ImageContainer>
					<Arrow clicked={this.arrowClickedHandler} direction="right" />
				</React.Fragment>
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
