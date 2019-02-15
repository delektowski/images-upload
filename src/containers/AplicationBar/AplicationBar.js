import React, { PureComponent } from 'react';

import Menu from '../../components/Shared/Menu/Menu';

import { AppBar, Toolbar, Typography, Avatar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BurstMode from '@material-ui/icons/BurstMode';

const styles = {
	header: {
		background: 'whitesmoke',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'fixed',
		height: 60,
		paddingLeft: '13%',
		zIndex: 100000
	},
	toolbar__header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	},
	appTitle: {
		lineHeight: 1.2,
		letterSpacing: 3,
		fontSize: '.5rem'
	},
	menuLoginContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon__loginContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	icon__login: {
		marginLeft: '5%'
	},
	iconCaptionFilterContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	iconCaptionContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: 40
	},
	iconCaption: {
		fontSize: '.56rem',
		color: 'rgb(48, 63, 159)'
	},
	avatar: {
		height: 30,
		width: 30
	},
	bgPrimary: {
		background: 'rgb(48, 63, 159)'
	},

	white: {
		color: 'white'
	}
};

class AplicationBar extends PureComponent {
	state = {
		anchorEl: null
	};

	onMenuClickHandler = (event) => {
		this.setState({ anchorEl: event });
	};

	onMenuCloseHandler = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		console.count('APLICATIONBAR');
		const { classes } = this.props;
		let amountAllIcon = null;
		let menu = null;
		let imagesAmount = null;
		if (this.props.imagesDataObj) {
			imagesAmount = Object.keys(this.props.imagesDataObj).length;
		}

		if (this.props.isAuthenticated) {
			amountAllIcon = (
				<React.Fragment>
					<div className={classes.iconCaptionFilterContainer}>
						<div className={classes.iconCaptionContainer}>
							<BurstMode color="primary" />
							<Typography className={classes.iconCaption} variant="caption">
								ZDJĘCIA
							</Typography>
						</div>
						<Avatar className={[ classes.avatar, classes.bgPrimary ].join(' ')}>
							<Typography className={classes.white} variant="caption">
								{imagesAmount}
							</Typography>
						</Avatar>
					</div>
				</React.Fragment>
			);
		}

		if (this.props.isAdminLogin || this.props.isAuthenticated) {
			console.count('MENUAPP');

			menu = (
				<Menu
					onMenuOpen={(e) => this.onMenuClickHandler(e)}
					onMenuClose={() => this.onMenuCloseHandler()}
					isMenuOpen={this.state.anchorEl}
					userName={this.props.userName}
					imagesDataObj={this.props.imagesDataObj}
					onLogoutHandler={this.props.onLogoutHandler}
					isAdminLogin={this.props.isAdminLogin}
					onCheckoutRelease={this.props.onCheckoutRelease}
					onCheckoutClose={this.props.onCheckoutClose}
					isCheckout={this.props.isCheckout}
				/>
			);
		}

		return (
			<React.Fragment>
				<AppBar className={classes.header} position="static" color="default">
					<Toolbar className={classes.toolbar__header}>
						<div>
							<Typography className={classes.appTitle} variant="overline" color="inherit">
								Peek
							</Typography>
							<Typography className={classes.appTitle} variant="overline" color="inherit">
								Pick
							</Typography>
							<Typography className={classes.appTitle} variant="overline" color="inherit">
								Pic
							</Typography>
						</div>
						{amountAllIcon}
						<div className={classes.menuLoginContainer}>
							<div className={classes.icon__loginContainer}>
								<AccountCircle className={classes.icon__login} />
								<Typography variant="caption">{this.props.userName}</Typography>
							</div>
							{menu}
						</div>
					</Toolbar>
				</AppBar>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(AplicationBar);
