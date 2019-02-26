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
		const {
			classes,
			isAuthenticated,
			userName,
			imagesDataObj,
			freePicturesAmount,
			discountProcent,
			picturePrice,
			isCheckout,
			onAmountSelected,
			allImagesTitles,
			picturesPaths,
			picturesTitles,
			isAdminLogin,
			isDrawerOpen
		} = this.props;
		let counter = null;
		let imagesGenerator = null;

		if (isAuthenticated && userName) {
			counter = (
				<Counter
					imagesDataObj={imagesDataObj}
					import
					FilterContext
					freePicturesAmount={freePicturesAmount}
					discountProcent={discountProcent}
					picturePrice={picturePrice}
					onFilterButtonsState={this.onFilterButtonsStateHandler}
					filterButtonsState={this.state}
					isCheckout={isCheckout}
					onAmountSelected={onAmountSelected}
					allImagesTitles={allImagesTitles}
					userName={userName}
				/>
			);
		}

		if (!this.props.isCheckout) {
			imagesGenerator = (
				<ImagesGenerator
					images={picturesPaths}
					titles={picturesTitles}
					imagesDataObj={imagesDataObj}
					userName={userName}
					filterButtonsState={this.state}
					isAdminLogin={isAdminLogin}
					onImageClick={this.onImageClickedTitleHandler}
					onHideMenu={this.onDrawerOpenHandler}
					isDrawerOpen={isDrawerOpen}
					isFilterButtonClicked={this.state.filterButtonClicked}
					onResetFilterButtonClicked={this.resetFilterButtonClickedHandler}
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
						open={isDrawerOpen}
						classes={{
							paper: [ classes.drawerPaper, isAdminLogin ? classes.zindexNegative : null ].join(' ')
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
