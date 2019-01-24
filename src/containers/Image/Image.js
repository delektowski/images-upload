import React, { Component } from 'react';
import classes from './Image.module.scss';
import Button from '../../components/Shared/Button/Button';
import Arrow from '../../components/Shared/Arrow/Arrow';
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
		ImageClickedSrc: '',
		ImageClickedId: '',
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
		const ImageClickedSrc = e.target.getAttribute('src');
		const ImageClickedId = e.target.getAttribute('alt');

		this.setState((prevState) => {
			return {
				isImageClicked: !prevState.isImageClicked,
				ImageClickedSrc: ImageClickedSrc,
				ImageClickedId: ImageClickedId
			};
		});
		this.props.onImageClick();
	};
	arrowClickedHandler = (e) => {
		console.log(e.target.getAttribute('data-direction'));
		const images = this.props.imagesDataObj;
		const imagesArr = Object.keys(images);

		const index = imagesArr.indexOf(this.state.imageId);
		const lastIndex = imagesArr.length - 1;
		console.log('lastIndex', lastIndex);
		// this.setState({
		// 	ImageClickedSrc: '',
		// 	ImageClickedId: '',
		// 	imageId: ''

		// })
	};

	render() {
		let image = null;
		if (this.state.isImageClicked) {
			image = (
				<React.Fragment>
					<Arrow clicked={this.arrowClickedHandler} direction="left" />

					<ImageContainer
						containerColor={this.state.containerColor}
						containerLarge={this.state.isImageClicked}
					>
						<figure>
							<img
								onClick={this.ImageClickedHandler}
								className={[ classes.Image, classes.Image__large ].join(' ')}
								src={this.state.ImageClickedSrc}
								alt={this.state.ImageClickedId}
							/>
							<figcaption className={classes.Image__title}>{this.state.ImageClickedId}</figcaption>
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
					<Arrow clicked={this.arrowClickedHandler} direction="right" />
				</React.Fragment>
			);
		} else {
			image = (
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
			);
		}

		return <React.Fragment>{image}</React.Fragment>;
	}
}

export default Image;
