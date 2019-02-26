import React, { Component } from 'react';
import Image from './Image/Image';
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/database';
import PropTypes from 'prop-types';

const styles = (theme) => ({
	imagesContainer: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: '0 auto',
		[theme.breakpoints.down('xs')]: {
			width: '70%',
			minWidth: 350
		},
		transition: 'all .3s'
	},
	marginTop: {
		transform: 'translateY(190px)'
	}
});

class ImagesGenerator extends Component {
	state = {
		updatedImagesDataObj: null,
		imageButtonClicked: false
	};

	componentDidMount() {
		const userNameDbElement = firebase.database().ref(`${this.props.userName}/images`);
		userNameDbElement.once('value', (snapshot) => {
			if (!snapshot.exists()) return;
			this.setState({ updatedImagesDataObj: snapshot.val() });
		});
	}

	componentDidUpdate() {
		if (this.props.isFilterButtonClicked || this.state.imageButtonClicked) {
			const userNameDbElement = firebase.database().ref(`${this.props.userName}/images`);
			userNameDbElement.once('value', (snapshot) => {
				if (!snapshot.exists()) return;
				this.setState({ updatedImagesDataObj: snapshot.val(), imageButtonClicked: false });
				this.props.onResetFilterButtonClicked();
			});
		}
	}

	getImagesTitlesArray = () => {
		console.log('this.props.userName', this.props.userName);

		let imagesDataObj;
		const imagesDataObjArr = [];

		const userNameDbElement = firebase.database().ref(`${this.props.userName}/images`);
		userNameDbElement.once('value', (snapshot) => {
			if (!snapshot.exists()) return;
			if (this.state.updatedImagesDataObj === null) {
				this.setState({ updatedImagesDataObj: snapshot.val() });
			}
		});

		imagesDataObj = this.state.updatedImagesDataObj;

		for (const prop in imagesDataObj) {
			imagesDataObjArr.push({ [prop]: imagesDataObj[prop] });
		}
		return imagesDataObjArr;
	};

	getImagesDataObjFiltered = () => {
		const greenClicked = this.props.filterButtonsState.greenClicked;
		const blueClicked = this.props.filterButtonsState.blueClicked;
		const redClicked = this.props.filterButtonsState.redClicked;
		const orangeClicked = this.props.filterButtonsState.orangeClicked;

		const imagesDataObjFiltered = this.getImagesTitlesArray()
			.filter((element) => {
				const isFilterGreenClicked = greenClicked ? element[Object.keys(element)].isClickedGreen : null;
				const isFilterBlueClicked = blueClicked ? element[Object.keys(element)].isClickedBlue : null;
				const isFilterOrangeClicked = orangeClicked ? element[Object.keys(element)].comment : null;
				let isFilterRedClicked = redClicked
					? true &&
						!element[Object.keys(element)].isClickedGreen &&
						!element[Object.keys(element)].isClickedBlue
					: null;

				return isFilterGreenClicked || isFilterBlueClicked || isFilterRedClicked || isFilterOrangeClicked;
			})
			.map((e) => Object.keys(e)[0]);

		return imagesDataObjFiltered;
	};

	getImagesPaths = () => {
		const imagesPaths = [];
		for (const prop in this.state.updatedImagesDataObj) {
			const imagePath = this.state.updatedImagesDataObj[prop].path;
			imagesPaths.push(imagePath);
		}
		return imagesPaths;
	};

	getImagesTitleArr = () => {
		const imagesTitleArr = this.getImagesDataObjFiltered().reduce((sum, current) => {
			const img = this.getImagesPaths().filter((image) => {
				let patt = new RegExp(current, 'g');
				return patt.test(image);
			});
			return sum.concat({ [current]: img[0] });
		}, []);

		return imagesTitleArr;
	};

	render() {
		console.count('IMAGESGENERATOR');
		const { classes, userName, isAdminLogin, onHideMenu, isDrawerOpen } = this.props;

		let imagesTitlesPaths = null;

		imagesTitlesPaths = this.getImagesTitleArr().map((element, i) => {
			return (
				<React.Fragment key={Object.keys(element)}>
					<Image
						imgNumber={i}
						src={Object.values(element)}
						caption={Object.keys(element)}
						imagesDataObj={this.state.updatedImagesDataObj}
						userName={userName}
						isAdminLogin={isAdminLogin}
						onHideMenu={onHideMenu}
					/>
				</React.Fragment>
			);
		});

		return (
			<React.Fragment>
				<div className={[ classes.imagesContainer, isDrawerOpen ? classes.marginTop : null ].join(' ')}>
					{imagesTitlesPaths}
				</div>
			</React.Fragment>
		);
	}
}

ImagesGenerator.propTypes = {
	classes: PropTypes.object,
	filterButtonsState: PropTypes.object,
	imagesDataObj: PropTypes.object,
	isAdminLogin: PropTypes.bool,
	isDrawerOpen: PropTypes.bool,
	isFilterButtonClicked: PropTypes.bool,
	onImageClick: PropTypes.func,
	onResetFilterButtonClicked: PropTypes.func,
	userName: PropTypes.string
};

export default withStyles(styles)(ImagesGenerator);
