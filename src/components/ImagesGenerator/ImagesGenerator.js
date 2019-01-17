import React from 'react';
import Image from '../../containers/Image/Image';

const imagesGenerator = (props) => {
	const images = props.images;
	const titles = props.titles;
	const picturesDataObj = props.picturesDataObj;

	// Link picture title with exact picture file
	const imageTitleObj = titles.reduce((sum, current) => {
		const img = images.filter((image) => {
			let patt = new RegExp(current, 'g');
			return patt.test(image);
		});
		return sum.concat({ [current]: img[0] });
	}, []);

	const imagesArr = imageTitleObj.map((element) => {
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

	return <React.Fragment>{imagesArr}</React.Fragment>;
};

export default imagesGenerator;
