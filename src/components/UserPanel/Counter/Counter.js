import React from 'react';
import Payment from './Payment/Payment';
import Filter from '../Filter/Filter';
import { Fade, Paper, Typography, Avatar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';
import AllInclusive from '@material-ui/icons/AllInclusive';

const styles = {
	paper: {
		background: 'whitesmoke',
		marginTop: 30,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 5
	},
	iconCaption: {
		fontSize: '.56rem'
	},
	iconCaptionFilterContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	iconCaptionContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 60
	},
	iconCaptionContainerBig: {
		width: 80
	},
	avatar: {
		height: 30,
		width: 30
	},
	green: {
		color: 'green'
	},
	bgGreen: {
		background: 'green'
	},
	red: {
		color: 'rgb(245, 0, 87)'
	},
	bgRed: {
		background: 'rgb(245, 0, 87)'
	},
	bgBlack: {
		background: 'black'
	},
	blue: {
		color: 'rgb(63, 81, 181)'
	},
	bgBlue: {
		background: 'rgb(63, 81, 181)'
	},
	white: {
		color: 'white'
	}
};

const counter = (props) => {
	const { classes } = props;
	const selectedElementsAmount = (elementColor) => {
		let amountOfElement = 0;

		switch (elementColor) {
			case 'green':
				for (let isClickedGreen in props.imagesDataObj) {
					if (props.imagesDataObj[isClickedGreen].isClickedGreen === true) amountOfElement++;
				}
				return amountOfElement;
			case 'blue':
				for (let isClickedBlue in props.imagesDataObj) {
					if (props.imagesDataObj[isClickedBlue].isClickedBlue === true) amountOfElement++;
				}
				return amountOfElement;

			case 'red':
				for (let isClickedRed in props.imagesDataObj) {
					if (props.imagesDataObj[isClickedRed].isClickedRed === true) amountOfElement++;
				}
				return amountOfElement;

			case 'all':
				for (let everyPicture in props.imagesDataObj) {
					if (everyPicture) amountOfElement++;
				}
				return amountOfElement;

			default:
				return null;
		}
	};

	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				<div className={classes.iconCaptionFilterContainer}>
					<div className={[ classes.iconCaptionContainer, classes.green ].join(' ')}>
						<div>
							<ThumbUpAlt />
							<Typography className={[ classes.iconCaption, classes.green ].join(' ')} variant="caption">
								TAK
							</Typography>
						</div>
						<Avatar className={[ classes.avatar, classes.bgGreen ].join(' ')}>
							<Typography className={classes.white} variant="caption">
								{selectedElementsAmount('green')}
							</Typography>
						</Avatar>
					</div>
					<Filter
						onFilterButtonsState={props.onFilterButtonsState}
						filterClicked="greenClicked"
						filterButtonsState={props.filterButtonsState}
					/>
				</div>

				<div className={classes.iconCaptionFilterContainer}>
					<div className={[ classes.iconCaptionContainer, classes.blue ].join(' ')}>
						<div>
							<ThumbsUpDown />
							<Typography className={[ classes.iconCaption, classes.blue ].join(' ')} variant="caption">
								MOŻE
							</Typography>
						</div>
						<Avatar className={[ classes.avatar, classes.bgBlue ].join(' ')}>
							<Typography className={classes.white} variant="caption">
								{selectedElementsAmount('blue')}
							</Typography>
						</Avatar>
					</div>
					<Filter
						onFilterButtonsState={props.onFilterButtonsState}
						filterClicked="blueClicked"
						filterButtonsState={props.filterButtonsState}
					/>
				</div>

				<div className={classes.iconCaptionFilterContainer}>
					<div className={[ classes.iconCaptionContainer, classes.red ].join(' ')}>
						<div>
							<ThumbDownAlt />
							<Typography className={[ classes.iconCaption, classes.red ].join(' ')} variant="caption">
								NIE
							</Typography>
						</div>
						<Avatar className={[ classes.avatar, classes.bgRed ].join(' ')}>
							<Typography className={classes.white} variant="caption">
								{selectedElementsAmount('red')}
							</Typography>
						</Avatar>
					</div>
					<Filter
						onFilterButtonsState={props.onFilterButtonsState}
						filterClicked="redClicked"
						filterButtonsState={props.filterButtonsState}
					/>
				</div>

				<div className={classes.iconCaptionFilterContainer}>
					<div className={[ classes.iconCaptionContainer, classes.iconCaptionContainerBig ].join(' ')}>
						<div>
							<AllInclusive />
							<Typography className={classes.iconCaption} variant="caption">
								WSZYSTKIE
							</Typography>
						</div>
						<Avatar className={[ classes.avatar, classes.bgBlack ].join(' ')}>
							<Typography className={classes.white} variant="caption">
								{selectedElementsAmount('all')}
							</Typography>
						</Avatar>
					</div>
					<Filter
						onFilterButtonsState={props.onFilterButtonsState}
						filterButtonsState={props.filterButtonsState}
						filterClicked="allClicked"
					/>
				</div>
			</Paper>

			<div className={classes.Counter} />

			<Payment
				selectedGreenAmount={selectedElementsAmount('green')}
				allSelectedAmount={selectedElementsAmount('all')}
				freePicturesAmount={props.freePicturesAmount}
				discountProcent={props.discountProcent}
				picturePrice={props.picturePrice}
			/>
		</React.Fragment>
	);
};

export default withStyles(styles)(counter);
