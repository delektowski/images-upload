import React, { PureComponent } from 'react';
import Image from '../../../containers/Image/Image';
import { withStyles } from '@material-ui/core/styles';
import ModalImage from '../../../containers/ModalImage/ModalImage';

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

class ImagesGenerator extends PureComponent {
	render() {
		console.count('IMAGESGENERATOR');
		const { classes } = this.props;
		let imagesPaths = [];
		let imagesTitlesPaths;
		const imagesDataObj = this.props.imagesDataObj;
		if (imagesDataObj !== null) {
			//Filter pictures based on filter button state
			const imagesDataObjArr = [];
			const greenClicked = this.props.filterButtonsState.greenClicked;
			const blueClicked = this.props.filterButtonsState.blueClicked;
			const redClicked = this.props.filterButtonsState.redClicked;
			const orangeClicked = this.props.filterButtonsState.orangeClicked;
			for (const prop in imagesDataObj) {
				imagesDataObjArr.push({ [prop]: imagesDataObj[prop] });
			}

			const imagesDataObjFiltered = imagesDataObjArr
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

			// Link picture title with exact picture file
			for (const prop in imagesDataObj) {
				const imagePath = imagesDataObj[prop].path;
				imagesPaths.push(imagePath);
			}

			const imageTitleArr = imagesDataObjFiltered.reduce((sum, current) => {
				const img = imagesPaths.filter((image) => {
					let patt = new RegExp(current, 'g');
					return patt.test(image);
				});
				return sum.concat({ [current]: img[0] });
			}, []);
			imagesTitlesPaths = imageTitleArr.map((element, imageNumber) => {
				return (
					<React.Fragment key={Object.keys(element)}>
						<Image
							onImageClick={this.props.onImageClick}
							src={Object.values(element)}
							caption={Object.keys(element)}
							imagesDataObj={imagesDataObj}
							userName={this.props.userName}
							isAdminLogin={this.props.isAdminLogin}
							onHideMenu={this.props.onHideMenu}
						/>
						<ModalImage
							isImageLarge={this.props.isImageLarge}
							onImageClick={this.props.onImageClick}
							imagesDataObj={imagesDataObj}
							userName={this.props.userName}
							isAdminLogin={this.props.isAdminLogin}
							onHideMenu={this.props.onHideMenu}
							onImageLargeClose={this.props.onImageLargeClose}
							caption={Object.keys(element)[0]}
						>
							<Image
								onImageClick={this.props.onImageClick}
								key={Object.keys(element)}
								src={Object.values(element)}
								caption={Object.keys(element)}
								imagesDataObj={imagesDataObj}
								userName={this.props.userName}
								isAdminLogin={this.props.isAdminLogin}
								onHideMenu={this.props.onHideMenu}
								isBiggerSize={true}
								ImageClickedTitle={this.props.ImageClickedTitle}
							/>
						</ModalImage>
					</React.Fragment>
				);
			});
		}

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
