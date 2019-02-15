import React, { Component } from 'react';
import Counter from '../../components/UserPanel/Counter/Counter';
import ImagesGenerator from '../../components/Shared/ImagesGenerator/ImagesGenerator';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Drawer } from '@material-ui/core/';

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

class ImagesAndCounter extends Component {
	state = {
		greenClicked: true,
		blueClicked: true,
		redClicked: true,
		orangeClicked: true,
		imageClickedTitle: '',
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

	imageLargeCloseHandler = () => {
		this.setState({
			imageClickedTitle: ''
		});
	};

	render() {
		console.count('IMAGESANDCOUNTER');
		const { classes } = this.props;
		let counter = null;
		let imagesGenerator = null;

		if (this.props.isAuthenticated) {
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
					isImageLarge={this.state.imageClickedTitle}
					ImageClickedTitle={this.state.imageClickedTitle}
					onImageLargeClose={this.imageLargeCloseHandler}
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

export default withStyles(styles)(ImagesAndCounter);
