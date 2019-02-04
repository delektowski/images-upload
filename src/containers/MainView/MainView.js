import React, { Component } from 'react';
import ImagesGenerator from '../../components/Shared/ImagesGenerator/ImagesGenerator';
import Login from '../../components/Login/Login';
import Layout from '../../hoc/Layout/Layout';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import UserPanel from '../../components/UserPanel/UserPanel';
import Backdrop from '../../components/Shared/Backdrop/Backdrop';
import Logout from '../../components/Logout/Logout';
import { AppBar, Toolbar, Typography, Paper } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Copyright from '@material-ui/icons/Copyright';
import Reset from '../../components/UserPanel/Reset/Reset';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';

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
	icon: {
		fontSize: '1rem',
		marginRight: '2%'
	},

	toolbar__header: {
		display: 'flex',
		justifyContent: 'space-between',
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
		flexDirection: 'row',
		alignItems: 'center'
	},
	icon__login: {
		marginLeft: '5%'
	},
	mainView: {
		marginTop: '200px',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingTop: '2%'
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
		height: 60,
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
	paperNonDrawer: {
		position: 'fixed',
		width: '100%',
		top: 50
	}
};

class mainView extends Component {
	state = {
		userName: '',
		isLoginClicked: false,
		isCreateClicked: false,
		createUserLogin: '',
		createUserPassword: '',
		imagesDataObj: null,
		selectedfiles: 0,
		isButtonDisabled: true,
		filterButtonsState: {
			greenClicked: true,
			blueClicked: true,
			redClicked: true
		},
		isAdminLogin: false,
		isEnabledBackdrop: false,
		isAuthenticated: false,
		errorLogin: '',
		onUserCreated: false,
		isDrawerOpen: true
	};

	componentDidUpdate() {
		if (
			this.state.filterButtonsState.greenClicked === false &&
			this.state.filterButtonsState.blueClicked === false &&
			this.state.filterButtonsState.redClicked === false
		) {
			this.setState({
				filterButtonsState: {
					greenClicked: false,
					blueClicked: false,
					redClicked: true
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
			createUserLogin: '',
			createUserPassword: '',
			imagesDataObj: null,
			selectedfiles: 0,
			isButtonDisabled: true,
			filterButtonsState: {
				greenClicked: true,
				blueClicked: true,
				redClicked: true
			},
			isAdminLogin: false,
			isEnabledBackdrop: false,
			isAuthenticated: false,
			errorLogin: '',
			onUserCreated: false,
			isDrawerOpen: true
		});
	};

	onFilterButtonsStateHandler = (buttonsStateObj) => {
		// if (buttonsStateObj === 'redClicked') {
		// 	this.setState({
		// 		filterButtonsState: {
		// 			greenClicked: false,
		// 			blueClicked: false,
		// 			redClicked: true
		// 		}
		// 	});
		// 	return;
		// }

		this.setState((prevState) => {
			const copyfilterButtonsState = { ...this.state.filterButtonsState };
			copyfilterButtonsState[buttonsStateObj] = !prevState.filterButtonsState[buttonsStateObj];
			return {
				filterButtonsState: copyfilterButtonsState
			};
		});
	};

	backdropHandler = () => {
		this.setState((prevState) => {
			return {
				isEnabledBackdrop: !prevState.isEnabledBackdrop
			};
		});
	};

	isDrawerOpenHandler = () => {
		this.setState((prevState) => {
			return {
				isDrawerOpen: !prevState.isDrawerOpen
			};
		});
	};
	render() {
		const { classes } = this.props;
		let adminPanel = null;
		let userPanel = null;
		let login = null;

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
					isAuthenticated={() => this.setState({ isAuthenticated: true })}
					onLoginDataPass={(imagesDataObj, freePicturesAmount, picturePrice, discountProcent) =>
						this.onLoginDataPass(imagesDataObj, freePicturesAmount, picturePrice, discountProcent)}
				/>
			);
		}

		return (
			<React.Fragment>
				<Layout>
					<header>
						{this.state.isAdminLogin || this.state.isAuthenticated ? (
							<Fab onClick={this.isDrawerOpenHandler} size="small" className={classes.fab}>
								{this.state.isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
							</Fab>
						) : null}
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

									{this.state.isAdminLogin || this.state.isAuthenticated ? (
										<React.Fragment>
											<Reset
												userName={this.state.userName}
												imagesDataObj={this.state.imagesDataObj}
											/>
											<Logout
												userName={this.state.userName}
												onLogoutHandler={this.onLogoutHandler}
											/>
										</React.Fragment>
									) : null}
									<div className={classes.icon__loginContainer}>
										<Typography variant="caption">{this.state.userName}</Typography>
										<AccountCircle className={classes.icon__login} />
									</div>
								</Toolbar>
							</AppBar>
						</Drawer>
					</header>
					<section>
						<div className={classes.mainView}>
							{this.state.errorLogin ? <p>{this.state.errorLogin}</p> : null}
							<Backdrop show={this.state.isEnabledBackdrop} disableBackdrop={this.backdropHandler} />
							{login}
							{adminPanel}
							<Drawer
								transitionDuration={500}
								variant="persistent"
								anchor="left"
								open={this.state.isDrawerOpen}
								classes={{
									paper: classes.drawerPaper
								}}
							>
								<Paper>{userPanel}</Paper>
							</Drawer>

							<ImagesGenerator
								images={this.state.picturesPaths}
								titles={this.state.picturesTitles}
								imagesDataObj={this.state.imagesDataObj}
								userName={this.state.userName}
								filterButtonsState={this.state.filterButtonsState}
								reset={this.state.reset}
								isAdminLogin={this.state.isAdminLogin}
								onImageClick={this.backdropHandler}
							/>
						</div>
					</section>
					<footer>
						<AppBar className={classes.footer} position="static" color="default">
							<Toolbar className={classes.toolbar__footer}>
								<Copyright className={classes.icon} />
								<Typography variant="caption" color="inherit">
									2019 by Marcin Delektowski
								</Typography>
							</Toolbar>
						</AppBar>
					</footer>
				</Layout>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(mainView);
