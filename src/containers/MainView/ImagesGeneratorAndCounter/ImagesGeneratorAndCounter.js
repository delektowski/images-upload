import React, { Component } from 'react';
import Counter from './Counter/Counter';
import ImagesGenerator from './ImagesGenerator/ImagesGenerator';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Drawer } from '@material-ui/core/';
import firebase from 'firebase/app';
import 'firebase/database';

const styles = {
	drawerPaper: {
		width: '100%',
		height: 160,
		overflow: 'visible',
		border: 0,
		background: 'rgba(0, 0, 0, 0)',
		zIndex: 1000
	},

	zindexNegative: {
		zIndex: -1
	}
};

class ImagesGeneratorAndCounter extends Component {
	state = {
		greenClicked: true,
		blueClicked: true,
		redClicked: true,
		orangeClicked: true,
		clientImagesDataObj: null,
		filterButtonsState: {
			greenClicked: true,
			blueClicked: true,
			redClicked: true,
			orangeClicked: true
		}
	};

	onFilterButtonsStateHandler = (buttonsStateObj) => {
		this.setState((prevState) => {
			const copyfilterButtonsState = { ...this.state.filterButtonsState };
			copyfilterButtonsState[buttonsStateObj] = !prevState.filterButtonsState[buttonsStateObj];
			return {
				filterButtonsState: copyfilterButtonsState
			};
		});
	};

	onFilterButtonsStateHandler = (buttonsStateObj) => {
		this.setState((prevState) => {
			return {
				[buttonsStateObj]: !prevState[buttonsStateObj]
			};
		});
	};

	onImageClickedTitleHandler = (title) => {
		this.setState({
			imageClickedTitle: title
		});
	};

	updateImageState = (containerColor, isClickedGreen, isClickedBlue, isClickedRed) => {
		return {
			containerColor: containerColor,
			isClickedGreen: isClickedGreen,
			isClickedBlue: isClickedBlue,
			isClickedRed: isClickedRed
		};
	};

	// testForceUpdate = (imageId, containerColor, isClickedGreen, isClickedBlue, isClickedRed) => {
	// 	firebase
	// 		.database()
	// 		.ref(`${this.props.userName}/images/${imageId}`)
	// 		.update(this.updateImageState(containerColor, isClickedGreen, isClickedBlue, isClickedRed));

	// 	const userNameDbElement = firebase.database().ref(this.props.userName);
	// 	userNameDbElement.once('value', (snapshot) => {
	// 		if (!snapshot.exists()) return;
	// 		this.setState({ clientImagesDataObj: snapshot.val().images });
	// 	});
	// };

	render() {
		console.count('ImagesGeneratorAndCounter');
		const { classes } = this.props;
		let counter = null;
		let imagesGenerator = null;

		if (this.props.isAuthenticated && this.props.userName) {
			counter = (
				<React.Fragment>
					<Counter
						imagesDataObj={this.props.imagesDataObj}
						freePicturesAmount={this.props.freePicturesAmount}
						discountProcent={this.props.discountProcent}
						picturePrice={this.props.picturePrice}
						onFilterButtonsState={this.onFilterButtonsStateHandler}
						filterButtonsState={this.state}
						isCheckout={this.props.isCheckout}
						onAmountSelected={this.props.onAmountSelected}
						allImagesTitles={this.props.allImagesTitles}
						userName={this.props.userName}
					/>
				</React.Fragment>
			);
		}

		if (!this.props.isCheckout) {
			imagesGenerator = (
				<ImagesGenerator
					images={this.props.picturesPaths}
					titles={this.props.picturesTitles}
					imagesDataObj={this.props.imagesDataObj}
					userName={this.props.userName}
					filterButtonsState={this.state}
					isAdminLogin={this.props.isAdminLogin}
					onImageClick={this.onImageClickedTitleHandler}
					onHideMenu={this.onDrawerOpenHandler}
					isDrawerOpen={this.props.isDrawerOpen}
					// testForceUpdate={this.testForceUpdate}
				/>
			);
		}

		return (
			<React.Fragment>
				<section>
					<Drawer
						transitionDuration={500}
						variant="persistent"
						anchor="left"
						open={this.props.isDrawerOpen}
						classes={{
							paper: [
								classes.drawerPaper,
								this.props.isAdminLogin ? classes.zindexNegative : null
							].join(' ')
						}}
					>
						<Paper>{counter}</Paper>
					</Drawer>
				</section>

				<section>{imagesGenerator}</section>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(ImagesGeneratorAndCounter);
