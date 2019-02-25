import React, { Component } from 'react';
import Counter from './Counter/Counter';
import ImagesGenerator from './ImagesGenerator/ImagesGenerator';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Drawer } from '@material-ui/core/';
import FilterContext from '../../../context/filter-context';
import PropTypes from 'prop-types';

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
		filterButtonClicked: false
	};

	onFilterButtonsStateHandler = (buttonsStateObj) => {
		this.setState((prevState) => {
			return {
				[buttonsStateObj]: !prevState[buttonsStateObj],
				filterButtonClicked: true
			};
		});
	};

	onImageClickedTitleHandler = (title) => {
		this.setState({
			imageClickedTitle: title
		});
	};

	resetFilterButtonClickedHandler = () => {
		this.setState({ filterButtonClicked: false });
	};

	render() {
		console.count('ImagesGeneratorAndCounter');
		const { classes } = this.props;
		let counter = null;
		let imagesGenerator = null;

		if (this.props.isAuthenticated && this.props.userName) {
			counter = (
				<Counter
					imagesDataObj={this.props.imagesDataObj}
					import
					FilterContext
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
					isFilterButtonClicked={this.state.filterButtonClicked}
					onResetFilterButtonClicked={this.resetFilterButtonClickedHandler}
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
				<FilterContext.Provider value={{ filterButtonsState: this.state }}>
					<section>{imagesGenerator}</section>
				</FilterContext.Provider>
			</React.Fragment>
		);
	}
}

ImagesGeneratorAndCounter.propTypes = {
	classes: PropTypes.object,
	discountProcent: PropTypes.string,
	freePicturesAmount: PropTypes.string,
	imagesDataObj: PropTypes.object,
	isAdminLogin: PropTypes.bool,
	isAuthenticated: PropTypes.bool,
	isCheckout: PropTypes.bool,
	isDrawerOpen: PropTypes.bool,
	onHideMenu: PropTypes.func,
	picturePrice: PropTypes.string,
	userName: PropTypes.string
};

export default withStyles(styles)(ImagesGeneratorAndCounter);
