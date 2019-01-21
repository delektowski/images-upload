import React from 'react';
import Image from '../../containers/Image/Image';

const imagesGenerator = (props) => {
	let imagesPaths = [];
	let imagesTitlesPaths;
	const imagesDataObj = props.imagesDataObj;

	if (imagesDataObj !== null) {
		//Filter pictures based on filter button state
		const imagesDataObjArr = [];
		const notSelectedClicked = props.filterButtonsState.notSelectedClicked;
		const allClicked = props.filterButtonsState.allClicked;
		const greenClicked = props.filterButtonsState.greenClicked;
		const blueClicked = props.filterButtonsState.blueClicked;
		const redClicked = props.filterButtonsState.redClicked;
		let nothingClicked;
		for (const prop in imagesDataObj) {
			imagesDataObjArr.push({ [prop]: imagesDataObj[prop] });
		}

		if (!allClicked & !notSelectedClicked & !greenClicked & !blueClicked & !redClicked) {
			nothingClicked = true;
		} else {
			nothingClicked = false;
		}

		const imagesDataObjFiltered = imagesDataObjArr
			.filter((element) => {
				const isFilterGreenClicked = greenClicked ? element[Object.keys(element)].isClickedGreen : null;
				const isFilterBlueClicked = blueClicked ? element[Object.keys(element)].isClickedBlue : null;
				const isFilterRedClicked = redClicked ? element[Object.keys(element)].isClickedRed : null;
				const isFilteredAllClicked = allClicked ? true : null;
				const isFilteredNotSelectedClicked = notSelectedClicked
					? !element[Object.keys(element)].isClickedGreen &&
						!element[Object.keys(element)].isClickedBlue &&
						!element[Object.keys(element)].isClickedRed
					: null;

				return (
					isFilteredNotSelectedClicked ||
					isFilterGreenClicked ||
					isFilterBlueClicked ||
					isFilterRedClicked ||
					nothingClicked ||
					isFilteredAllClicked
				);
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
