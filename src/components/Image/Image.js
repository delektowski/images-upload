import React, { Component } from 'react';
import classes from './Image.module.scss';
import Button from '../../components/Button/Button';
import ImageContainer from '../ImageContainer/ImageContainer';

class Image extends Component {
	state = {
		buttonGreenClicked: false,
		buttonBlueClicked: false,
		buttonRedClicked: false,
		containerColor: ''
	};

	componentDidMount() {
		// const picturesDataObjIterable = Object.entries(this.props.picturesDataObj);
		// picturesDataObjIterable.forEach((element) => {
		// 	if (element[0] === this.props.caption[0]) {
		// 		console.log('jest');
		// 	}
		// });
	}

	buttonClickHandler = (buttonColor) => {
		switch (buttonColor) {
			case 'green':
				this.setState({ containerColor: 'green' });
				break;
			case 'blue':
				this.setState({ containerColor: 'blue' });
				break;
			case 'red':
				this.setState({ containerColor: 'red' });
				break;
			default:
				break;
		}
	};

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
