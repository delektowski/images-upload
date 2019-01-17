import React, { Component } from 'react';
import classes from './Image.module.scss';
import Button from '../../components/Button/Button';
import ImageContainer from '../ImageContainer/ImageContainer';

class Image extends Component {
	state = {
		isClickedGreen: false,
		isClickedBlue: false,
		isClickedRed: false,
		containerColor: ''
	};

	buttonClickHandler = (buttonColor) => {
		switch (buttonColor) {
			case 'green':
				this.setState((prevState) => {
					let color = 'green';
					if (prevState.isClickedGreen === true) color = '';
					return {
						isClickedGreen: !prevState.isClickedGreen,
						isClickedBlue: false,
						isClickedRed: false,
						containerColor: color
					};
				});
				break;
			case 'blue':
				this.setState((prevState) => {
					let color = 'blue';
					if (prevState.isClickedBlue === true) color = '';
					return {
						isClickedBlue: !prevState.isClickedBlue,
						isClickedGreen: false,
						isClickedRed: false,
						containerColor: color
					};
				});
				break;
			case 'red':
				this.setState((prevState) => {
					let color = 'red';
					if (prevState.isClickedRed === true) color = '';
					return {
						isClickedRed: !prevState.isClickedRed,
						isClickedGreen: false,
						isClickedBlue: false,
						containerColor: color
					};
				});
				break;
			default:
				break;
		}
	};

	componentDidMount() {
		console.log(this.props.picturesDataObj);
		for (let key in this.props.picturesDataObj) {
			// Recognize state of this picture from Firebase data
			if (key === this.props.caption[0]) {
				let color = '';
				if (this.props.picturesDataObj[key].isClickedGreen) color = 'green';
				if (this.props.picturesDataObj[key].isClickedBlue) color = 'blue';
				if (this.props.picturesDataObj[key].isClickedRed) color = 'red';
				this.setState({
					isClickedGreen: this.props.picturesDataObj[key].isClickedGreen,
					isClickedBlue: this.props.picturesDataObj[key].isClickedBlue,
					isClickedRed: this.props.picturesDataObj[key].isClickedRed,
					containerColor: color
				});
			}
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
