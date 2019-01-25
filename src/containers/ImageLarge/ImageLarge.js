import React, { Component } from 'react';
import ImageContainer from '../../components/Shared/ImageContainer/ImageContainer';
import Button from '../../components/Shared/Button/Button';
import Arrow from '../../components/Shared/Arrow/Arrow';
import classes from './ImageLarge.module.scss';
import firebase from 'firebase/app';
import 'firebase/database';
import { updateImageState, updateLargeImageState } from './utylity';

class ImageLarge extends Component {
	state = {
		imageLargeSrc: '',
		imageLargeId: '',
		imageLargeContainerColor: '',
		isClickedGreenImgLarge: false,
		isClickedBlueImgLarge: false,
		isClickedRedImgLarge: false
	};

	componentDidMount() {
		this.setState({
			imageLargeSrc: this.props.imageLargeSrc,
			imageLargeId: this.props.imageLargeId,
			imageLargeContainerColor: this.props.imageLargeContainerColor,
			isClickedGreenImgLarge: this.props.isClickedGreenImgLarge,
			isClickedBlueImgLarge: this.props.isClickedBlueImgLarge,
			isClickedRedImgLarge: this.props.isClickedRedImgLarge
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
		this.setState({
			imageLargeSrc: images[nextImageId].path,
			imageLargeId: imagesArr[index + direction],
			imageLargeContainerColor: images[nextImageId].containerColor,
			isClickedGreenImgLarge: images[nextImageId].isClickedGreen,
			isClickedBlueImgLarge: images[nextImageId].isClickedBlue,
			isClickedRedImgLarge: images[nextImageId].isClickedRed
		});
	};

	render() {
		return (
			<React.Fragment>
				<Arrow clicked={this.arrowClickedHandler} direction="left" />
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
				</ImageContainer>
				<Arrow clicked={this.arrowClickedHandler} direction="right" />
			</React.Fragment>
		);
	}
}

export default ImageLarge;
