export const updateImageState = (containerColor, isClickedGreen, isClickedBlue, isClickedRed) => {
	return {
		containerColor: containerColor,
		isClickedGreen: isClickedGreen,
		isClickedBlue: isClickedBlue,
		isClickedRed: isClickedRed
	};
};

export const updateLargeImageState = (containerColor, isClickedGreen, isClickedBlue, isClickedRed) => {
	return {
		imageLargeContainerColor: containerColor,
		isClickedGreenImgLarge: isClickedGreen,
		isClickedBlueImgLarge: isClickedBlue,
		isClickedRedImgLarge: isClickedRed
	};
};
