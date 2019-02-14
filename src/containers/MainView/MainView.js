import React, { Component } from 'react';
import ImagesGenerator from '../../components/Shared/ImagesGenerator/ImagesGenerator';
import Login from '../../components/Login/Login';
import Layout from '../../hoc/Layout/Layout';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import UserPanel from '../../components/UserPanel/UserPanel';
import Menu from '../../components/Shared/Menu/Menu';
import Confirmation from '../../components/UserPanel/Checkout/Confirmation/Confirmation';
import Spinner from '../../components/Shared/Spinner/Spinner';

import { AppBar, Toolbar, Typography, Paper, Fab, Drawer, Avatar } from '@material-ui/core/';

import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Copyright from '@material-ui/icons/Copyright';
import BurstMode from '@material-ui/icons/BurstMode';

import { Route } from 'react-router-dom';

const styles = {
	mainView: {},
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
	icon: {
		fontSize: '1rem',
		marginRight: '2%'
	},

	toolbar__header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	},
	footer: {
		background: 'whitesmoke',
		height: 20,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed',
		bottom: 0
	},
	toolbar__footer: {
		display: 'flex',
		width: 300,

		alignItems: 'center',
		justifyContent: 'center'
	},
	icon__loginContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	icon__login: {
		marginLeft: '5%'
	},

	appTitle: {
		lineHeight: 1.2,
		letterSpacing: 3,
		fontSize: '.5rem'
	},
	fab: {
		position: 'fixed',
		left: '2%',
		zIndex: 10000,
		top: '1%'
	},
	drawerPaper: {
		width: '100%',
		height: 160,
		overflow: 'visible',
		border: 0,
		background: 'rgba(0, 0, 0, 0)',
		zIndex: 1000
	},
	drawerPaperMenu: {
		width: '100%',
		height: 60,
		overflow: 'visible',
		border: 0,
		background: 'rgba(0, 0, 0, 0)'
	},

	menuLoginContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
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
	avatar: {
		height: 30,
		width: 30
	},
	bgPrimary: {
		background: 'rgb(48, 63, 159)'
	},
	white: {
		color: 'white'
	},
	iconCaption: {
		fontSize: '.56rem',
		color: 'rgb(48, 63, 159)'
	},
	zindexNegative: {
		zIndex: -1
	},
	route: {
		background: 'green',
		width: 200,
		height: 100
	},
	modal: {
		zIndex: 200,
		width: '100%',
		height: '100%',
		position: 'fixed',
		background: 'rgba(114, 114, 114, 0)',
		pointerEvents: 'none',
		overflow: 'hidden'
	}
};

class mainView extends Component {
	state = {
		userName: '',
		isLoginClicked: false,
		isCreateClicked: false,
		isCheckout: false,
		createUserLogin: '',
		createUserPassword: '',
		imagesDataObj: null,
		freePicturesAmount: 0,
		picturePrice: 0,
		discountProcent: 0,
		selectedfiles: 0,
		isButtonDisabled: true,
		filterButtonsState: {
			greenClicked: true,
			blueClicked: true,
			redClicked: true,
			orangeClicked: true
		},
		isAdminLogin: false,
		isAuthenticated: false,
		errorLogin: '',
		onUserCreated: false,
		isDrawerOpen: true,
		isFooterHidden: false,
		imageClickedTitle: '',
		anchorEl: null,
		amountSelected: 0,
		isModalSpinner: false
	};

	componentDidUpdate() {
		if (
			this.state.filterButtonsState.greenClicked === false &&
			this.state.filterButtonsState.blueClicked === false &&
			this.state.filterButtonsState.redClicked === false &&
			this.state.filterButtonsState.orangeClicked === false
		) {
			this.setState({
				filterButtonsState: {
					greenClicked: false,
					blueClicked: false,
					redClicked: true,
					orangeClicked: false
				}
			});
		}
	}

	onLoginDataPass = (imagesDataObj, freePicturesAmount, picturePrice, discountProcent) => {
		this.setState({
			imagesDataObj: imagesDataObj,
			isLoginClicked: false,
			freePicturesAmount: freePicturesAmount,
			picturePrice: picturePrice,
			discountProcent: discountProcent
		});
	};

	onLogoutHandler = () => {
		this.setState({
			userName: '',
			isLoginClicked: false,
			isCreateClicked: false,
			isCheckout: false,
			createUserLogin: '',
			createUserPassword: '',
			imagesDataObj: null,
			freePicturesAmount: 0,
			picturePrice: 0,
			discountProcent: 0,
			selectedfiles: 0,
			isButtonDisabled: true,
			filterButtonsState: {
				greenClicked: true,
				blueClicked: true,
				redClicked: true,
				orangeClicked: true
			},
			isAdminLogin: false,
			isAuthenticated: false,
			errorLogin: '',
			onUserCreated: false,
			isDrawerOpen: true,
			isFooterHidden: false,
			imageClickedTitle: '',
			anchorEl: null
		});
	};

	onFilterButtonsStateHandler = (buttonsStateObj) => {
		this.setState((prevState) => {
			const copyfilterButtonsState = { ...this.state.filterButtonsState };
			copyfilterButtonsState[buttonsStateObj] = !prevState.filterButtonsState[buttonsStateObj];
			return {
				filterButtonsState: copyfilterButtonsState
			};
		});
	};

	onDrawerOpenHandler = () => {
		if (!this.state.imageClickedTitle) {
			this.setState((prevState) => {
				return {
					isDrawerOpen: !prevState.isDrawerOpen
				};
			});
		}
	};

	onImageClickedTitleHandler = (title) => {
		this.setState({
			imageClickedTitle: title
		});
	};

	imageLargeCloseHandler = () => {
		this.setState({
			imageClickedTitle: ''
		});
	};

	onMenuClickHandler = (event) => {
		this.setState({ anchorEl: event });
	};

	onMenuCloseHandler = () => {
		this.setState({ anchorEl: null });
	};

	onCheckoutReleaseHandler = () => {
		this.setState({ isCheckout: true });
	};

	onAmountSelectedHandler = (amountSelected) => {
		if (amountSelected !== this.state.amountSelected) {
			this.setState({ amountSelected: amountSelected });
		}
	};

	onCheckoutCloseHandler = () => {
		this.setState({ isCheckout: false });
	};

	onAuthenticationHandler = () => {
		this.setState({ isAuthenticated: true });
	};

	allImagesTitlesHandler = () => {
		return this.state.imagesDataObj ? Object.keys(this.state.imagesDataObj).join('", "') : '';
	};

	onModalSpinnerHandler = (value) => {
		this.setState({ isModalSpinner: value });
	};

	render() {
		const { classes } = this.props;

		let adminPanel = null;
		let userPanel = null;
		let login = null;
		let menu = null;
		let menuHideButton = null;
		let reset = null;
		let amountAllIcon = null;
		let imagesGenerator = null;
		let footerBar = null;

		if (this.state.isAdminLogin) {
			adminPanel = (
				<React.Fragment>
					<AdminPanel
						logout={(e) => this.onLogoutHandler(e)}
						selectedfiles={(e) => this.setState({ selectedfiles: e })}
						uploadSelectedImages={this.state.selectedfiles}
						isButtonDisabled={this.state.isButtonDisabled}
						disableButton={this.disableUploadButtonHandler}
						freePicturesAmount={this.state.freePicturesAmount}
						changeFreePicturesAmount={this.changeFreePicturesAmountHandler}
						discountProcent={this.state.discountProcent}
						changeDiscountValue={this.changeDiscountValueHandler}
						picturePrice={this.state.picturePrice}
						changePicturePrice={this.changepicturePriceHandler}
						imagesAmount={this.state.imagesDataObj ? Object.keys(this.state.imagesDataObj).length : 0}
						adminLogin={() => this.setState({ isAdminLogin: true })}
						onChangeUserName={(userName) =>
							this.setState({ userName: userName, createUserLogin: userName })}
						imagesDataObj={(images) => this.setState({ imagesDataObj: images })}
						loginClicked={() => this.setState({ isLoginClicked: false })}
						userName={this.state.userName}
						onUserCreated={() => this.setState({ isUserCreated: true })}
						isUserCreated={this.state.isUserCreated}
					/>
				</React.Fragment>
			);
		}

		if (this.state.isAuthenticated) {
			userPanel = (
				<React.Fragment>
					<UserPanel
						buttonLogout={(e) => this.onLogoutHandler(e)}
						imagesDataObj={this.state.imagesDataObj}
						onFilterButtonsState={this.onFilterButtonsStateHandler}
						filterButtonsState={this.state.filterButtonsState}
						userName={this.state.userName}
						freePicturesAmount={this.state.freePicturesAmount}
						discountProcent={this.state.discountProcent}
						picturePrice={this.state.picturePrice}
						onLogoutHandler={this.onLogoutHandler}
						isDrawerOpen={this.state.isDrawerOpen}
						isCheckout={this.state.isCheckout}
						onAmountSelected={this.onAmountSelectedHandler}
						allImagesTitles={this.allImagesTitlesHandler}
					/>
				</React.Fragment>
			);
		}

		if (!this.state.isAdminLogin && !this.state.isAuthenticated) {
			login = (
				<Login
					onLogin={this.onLoginClickedHandler}
					adminLogin={() => this.setState({ isAdminLogin: true })}
					loginClicked={() => this.setState({ isLoginClicked: false })}
					onChangeUserName={(userName) => this.setState({ userName: userName })}
					isCreateUserLogin={this.state.createUserLogin}
					isAuthenticated={this.onAuthenticationHandler}
					onLoginDataPass={(imagesDataObj, freePicturesAmount, picturePrice, discountProcent) =>
						this.onLoginDataPass(imagesDataObj, freePicturesAmount, picturePrice, discountProcent)}
				/>
			);
		}

		if (this.state.isAdminLogin || this.state.isAuthenticated) {
			menu = (
				<Menu
					onMenuOpen={(e) => this.onMenuClickHandler(e)}
					onMenuClose={() => this.onMenuCloseHandler()}
					isMenuOpen={this.state.anchorEl}
					userName={this.state.userName}
					imagesDataObj={this.state.imagesDataObj}
					onLogoutHandler={this.onLogoutHandler}
					isAdminLogin={this.state.isAdminLogin}
					onCheckoutRelease={this.onCheckoutReleaseHandler}
					onCheckoutClose={this.onCheckoutCloseHandler}
					isCheckout={this.state.isCheckout}
				/>
			);
		}

		if (this.state.isAuthenticated) {
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
								{Object.keys(this.state.imagesDataObj).length}
							</Typography>
						</Avatar>
					</div>
				</React.Fragment>
			);
		}

		if (!this.state.isCheckout) {
			imagesGenerator = (
				<ImagesGenerator
					images={this.state.picturesPaths}
					titles={this.state.picturesTitles}
					imagesDataObj={this.state.imagesDataObj}
					userName={this.state.userName}
					filterButtonsState={this.state.filterButtonsState}
					reset={this.state.reset}
					isAdminLogin={this.state.isAdminLogin}
					onImageClick={this.onImageClickedTitleHandler}
					onHideMenu={this.onDrawerOpenHandler}
					isDrawerOpen={this.state.isDrawerOpen}
					isImageLarge={this.state.imageClickedTitle}
					ImageClickedTitle={this.state.imageClickedTitle}
					onImageLargeClose={this.imageLargeCloseHandler}
					onModalSpinner={this.onModalSpinnerHandler}
				/>
			);
		}

		if (this.state.isAuthenticated && !this.state.imageClickedTitle && !this.state.isCheckout) {
			menuHideButton = (
				<Fab onClick={this.onDrawerOpenHandler} size="small" className={classes.fab}>
					{this.state.isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
				</Fab>
			);
		}
		if (!this.state.isAuthenticated) {
			footerBar = (
				<AppBar className={classes.footer} position="static" color="default">
					<Toolbar className={classes.toolbar__footer}>
						<Copyright className={classes.icon} />
						<Typography variant="caption" color="inherit">
							2019 Marcin Delektowski
						</Typography>
					</Toolbar>
				</AppBar>
			);
		}

		console.count('MAINVIEW');

		return (
			<React.Fragment>
				<Layout>
					<div className={this.state.isModalSpinner ? classes.modal : null}>
						<Spinner isModalSpinner={this.state.isModalSpinner} />
						<header>
							{menuHideButton}
							<Drawer
								transitionDuration={500}
								variant="persistent"
								anchor="left"
								open={this.state.isDrawerOpen}
								classes={{
									paper: classes.drawerPaperMenu
								}}
							>
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
										{reset}
										<div className={classes.menuLoginContainer}>
											<div className={classes.icon__loginContainer}>
												<AccountCircle className={classes.icon__login} />
												<Typography variant="caption">{this.state.userName}</Typography>
											</div>
											{menu}
										</div>
									</Toolbar>
								</AppBar>
							</Drawer>
						</header>

						<main>
							<div className={classes.mainView}>
								<section>
									<Route
										path="/confirmation"
										render={() => {
											return <Confirmation open={true} />;
										}}
									/>

									{this.state.errorLogin ? <p>{this.state.errorLogin}</p> : null}
									<Route
										path="/"
										exact
										render={() => {
											return login;
										}}
									/>
								</section>

								<section>{adminPanel}</section>

								<section>
									<Drawer
										transitionDuration={500}
										variant="persistent"
										anchor="left"
										open={this.state.isDrawerOpen}
										classes={{
											paper: [
												classes.drawerPaper,
												this.state.isAdminLogin ? classes.zindexNegative : null
											].join(' ')
										}}
									>
										<Paper>{userPanel}</Paper>
									</Drawer>
								</section>

								<section>{imagesGenerator}</section>
							</div>
						</main>

						<footer>{footerBar}</footer>
					</div>
				</Layout>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(mainView);
