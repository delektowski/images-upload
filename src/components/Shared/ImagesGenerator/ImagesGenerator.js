import React from 'react';
import Image from '../../../containers/Image/Image';

const imagesGenerator = (props) => {
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
				/>
			);
		});
	}

	return <React.Fragment>{imagesTitlesPaths}</React.Fragment>;
};

export default imagesGenerator;
