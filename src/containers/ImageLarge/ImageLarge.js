import React, { Component } from 'react';
import ImageContainer from '../../components/Shared/ImageContainer/ImageContainer';
import Button from '../../components/Shared/Button/Button';
import Arrow from '../../components/Shared/Arrow/Arrow';
import classes from './ImageLarge.module.scss';

class ImageLarge extends Component {
	render() {
		return (
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
}

export default ImageLarge;
