import React from 'react';
import Image from '../../../containers/Image/Image';
import { withStyles } from '@material-ui/core/styles';
import ModalImage from '../../../containers/ModalImage/ModalImage';
// import classes from '*.module.css';

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

const imagesGenerator = (props) => {
	const { classes } = props;
	let imagesPaths = [];
	let imagesTitlesPaths;
	const imagesDataObj = props.imagesDataObj;

	if (imagesDataObj !== null) {
		//Filter pictures based on filter button state
		const imagesDataObjArr = [];
		const greenClicked = props.filterButtonsState.greenClicked;
		const blueClicked = props.filterButtonsState.blueClicked;
		const redClicked = props.filterButtonsState.redClicked;
		for (const prop in imagesDataObj) {
			imagesDataObjArr.push({ [prop]: imagesDataObj[prop] });
		}

		const imagesDataObjFiltered = imagesDataObjArr
			.filter((element) => {
				const isFilterGreenClicked = greenClicked ? element[Object.keys(element)].isClickedGreen : null;
				const isFilterBlueClicked = blueClicked ? element[Object.keys(element)].isClickedBlue : null;
				let isFilterRedClicked = redClicked
					? true &&
						!element[Object.keys(element)].isClickedGreen &&
						!element[Object.keys(element)].isClickedBlue
					: null;

				return isFilterGreenClicked || isFilterBlueClicked || isFilterRedClicked;
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

		imagesTitlesPaths = imageTitleArr.map((element) => {
			return (
				<Image
					onImageClick={props.onImageClick}
					key={Object.keys(element)}
					src={Object.values(element)}
					caption={Object.keys(element)}
					imagesDataObj={imagesDataObj}
					userName={props.userName}
					isAdminLogin={props.isAdminLogin}
					onHideMenu={props.onHideMenu}
				/>
			);
		});
	}
	console.log('imagesDataObj', imagesDataObj);

	return (
		<React.Fragment>
			<div className={[ classes.imagesContainer, props.isDrawerOpen ? classes.marginTop : null ].join(' ')}>
				{imagesTitlesPaths}
				<ModalImage
					isDrawerOpen={props.isDrawerOpen}
					onImageClick={props.onImageClick}
					imagesDataObj={imagesDataObj}
					userName={props.userName}
					isAdminLogin={props.isAdminLogin}
					onHideMenu={props.onHideMenu}
				>
					<Image
						onImageClick={props.onImageClick}
						// key={Object.keys(element)}
						src={[
							'https://firebasestorage.googleapis.com/v0/b/hooks-b96d6.appspot.com/o/images%2Ffikacz3%2Fwiara_i_swiatlo_szczecin_010.jpg?alt=media&token=bf0b1c63-1209-4e12-97f5-59385f74edf0'
						]}
						caption="kokos"
						imagesDataObj={props.imagesDataObj}
						userName={props.userName}
						isAdminLogin={props.isAdminLogin}
						onHideMenu={props.onHideMenu}
					/>
				</ModalImage>
			</div>
		</React.Fragment>
	);
};
export default withStyles(styles)(imagesGenerator);
