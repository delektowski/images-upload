import React, { Component } from 'react';
import Image from './Image/Image';
import { withStyles } from '@material-ui/core/styles';

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
		isModalImage: false
	};

	getImagesTitlesArray = () => {
		const imagesDataObj = this.props.imagesDataObj;
		const imagesDataObjArr = [];
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
		for (const prop in this.props.imagesDataObj) {
			const imagePath = this.props.imagesDataObj[prop].path;
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
		const { classes } = this.props;

		let imagesTitlesPaths = null;

		imagesTitlesPaths = this.getImagesTitleArr().map((element) => {
			return (
				<React.Fragment key={Object.keys(element)}>
					<Image
						src={Object.values(element)}
						caption={Object.keys(element)}
						imagesDataObj={this.props.imagesDataObj}
						userName={this.props.userName}
						isAdminLogin={this.props.isAdminLogin}
						onHideMenu={this.props.onHideMenu}
						testForceUpdate={this.props.testForceUpdate}
					/>
				</React.Fragment>
			);
		});

		return (
			<React.Fragment>
				<div
					className={[ classes.imagesContainer, this.props.isDrawerOpen ? classes.marginTop : null ].join(
						' '
					)}
				>
					{imagesTitlesPaths}
				</div>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(ImagesGenerator);
