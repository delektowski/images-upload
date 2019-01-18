import React, { Component } from 'react';
import classes from './Image.module.scss';
import Button from '../../components/Button/Button';
import ImageContainer from '../../components/ImageContainer/ImageContainer';
import firebase from 'firebase/app';
import 'firebase/database';
import { updateObj } from './utylity';

class Image extends Component {
	state = {
		containerColor: '',
		isClickedGreen: false,
		isClickedBlue: false,
		isClickedRed: false
	};

	buttonClickHandler = (buttonColor) => {
		switch (buttonColor) {
			case 'green':
				this.setState((prevState) => {
					let color = 'green';
					if (prevState.isClickedGreen === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/${this.props.caption[0]}`)
						.update(updateObj(color, !prevState.isClickedGreen, false, false));

					return updateObj(color, !prevState.isClickedGreen, false, false);
				});

				break;
			case 'blue':
				this.setState((prevState) => {
					let color = 'blue';
					if (prevState.isClickedBlue === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/${this.props.caption[0]}`)
						.update(updateObj(color, false, !prevState.isClickedBlue, false));
					return updateObj(color, false, !prevState.isClickedBlue, false);
				});
				break;
			case 'red':
				this.setState((prevState) => {
					let color = 'red';
					if (prevState.isClickedRed === true) color = '';
					firebase
						.database()
						.ref(`${this.props.userName}/${this.props.caption[0]}`)
						.update(updateObj(color, false, false, !prevState.isClickedRed));
					return updateObj(color, false, false, !prevState.isClickedRed);
				});
				break;
			default:
				break;
		}
	};

	componentDidMount() {
		// Recognize state of the element based on Firebase data
		for (let key in this.props.picturesDataObj) {
			if (key === this.props.caption[0]) {
				let color = '';
				if (this.props.picturesDataObj[key].isClickedGreen) color = 'green';
				if (this.props.picturesDataObj[key].isClickedBlue) color = 'blue';
				if (this.props.picturesDataObj[key].isClickedRed) color = 'red';
				this.setState(
					updateObj(
						color,
						this.props.picturesDataObj[key].isClickedGreen,
						this.props.picturesDataObj[key].isClickedBlue,
						this.props.picturesDataObj[key].isClickedRed
					)
				);
			}
		}
	}

	componentDidUpdate() {
		// This make possible to see changes simultaneously on different instances of the app
		if (this.props.picturesDataObj[this.props.caption[0]].isClickedGreen !== this.state.isClickedGreen) {
			this.setState({
				isClickedGreen: this.props.picturesDataObj[this.props.caption[0]].isClickedGreen,
				containerColor: this.props.picturesDataObj[this.props.caption[0]].containerColor
			});
		}
		if (this.props.picturesDataObj[this.props.caption[0]].isClickedBlue !== this.state.isClickedBlue) {
			this.setState({
				isClickedBlue: this.props.picturesDataObj[this.props.caption[0]].isClickedBlue,
				containerColor: this.props.picturesDataObj[this.props.caption[0]].containerColor
			});
		}
		if (this.props.picturesDataObj[this.props.caption[0]].isClickedRed !== this.state.isClickedRed) {
			this.setState({
				isClickedRed: this.props.picturesDataObj[this.props.caption[0]].isClickedRed,
				containerColor: this.props.picturesDataObj[this.props.caption[0]].containerColor
			});
		}
	}

	render() {
		return (
			<React.Fragment>
				<ImageContainer containerColor={this.state.containerColor}>
					<figure>
						<img className={classes.Image} src={this.props.src} alt={this.props.caption[0]} />
						<figcaption className={classes.Image__title}>{this.props.caption[0]}</figcaption>
					</figure>
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
				</ImageContainer>
			</React.Fragment>
		);
	}
}

export default Image;
