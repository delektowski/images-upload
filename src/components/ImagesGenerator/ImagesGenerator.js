import React from 'react';
import Image from '../../containers/Image/Image';

const imagesGenerator = (props) => {
	// const images = props.images;
	let imagesTitles = '';
	let imagesPaths = [];
	let imagesTitlesPaths;
	const picturesDataObj = props.picturesDataObj;

	//Filter pictures based on filter button state
	// console.log('imagesTitles', imagesTitles);

	// const picturesDataObjFiltered =

	// Link picture title with exact picture file
	if (picturesDataObj !== null) {
		imagesTitles = Object.keys(picturesDataObj);
		for (const prop in picturesDataObj) {
			const imagePath = picturesDataObj[prop].path;
			imagesPaths.push(imagePath);
		}

		const imageTitleObj = imagesTitles.reduce((sum, current) => {
			const img = imagesPaths.filter((image) => {
				let patt = new RegExp(current, 'g');
				return patt.test(image);
			});
			return sum.concat({ [current]: img[0] });
		}, []);

		imagesTitlesPaths = imageTitleObj.map((element) => {
			return (
				<Image
					key={Object.keys(element)}
					src={Object.values(element)}
					caption={Object.keys(element)}
					picturesDataObj={picturesDataObj}
					userName={props.userName}
				/>
			);
		});
	}

	return <React.Fragment>{imagesTitlesPaths}</React.Fragment>;
};

export default imagesGenerator;
