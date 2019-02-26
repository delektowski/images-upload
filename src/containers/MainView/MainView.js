import React, { Component } from 'react';
import Login from './Login/Login';
import Layout from '../../hoc/Layout/Layout';
import Uploader from './Uploader/Uploader';
import CreateUser from './CreateUser/CreateUser';
import Confirmation from '../../components/UserPanel/Checkout/Confirmation/Confirmation';
import AplicationBar from './AplicationBar/AplicationBar';
import ImagesGeneratorAndCounter from './ImagesGeneratorAndCounter/ImagesGeneratorAndCounter';
import { AppBar, Toolbar, Typography, Fab, Drawer } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Copyright from '@material-ui/icons/Copyright';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = {
	mainView: {},
	icon: {
		fontSize: '1rem',
		marginRight: '2%'
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

class MainView extends Component {
	state = {
		userName: '',
		isLoginClicked: false,
		isCreateClicked: false,
		isCheckout: false,
		createUserLogin: '',
		createUserPassword: '',
		imagesDataObj: null,
		picturePrice: 0,
		discountProcent: 0,
		selectedfiles: [],
		isButtonDisabled: true,
		isAdminLogin: false,
		isAuthenticated: false,
		errorLogin: '',
		onUserCreated: false,
		isDrawerOpen: true,
		isFooterHidden: false
	};

	onLoginDataPass = (imagesDataObj, freePicturesAmount, picturePrice, discountProcent) => {
		console.log('onLoginDataPass', imagesDataObj);

		this.setState({
			imagesDataObj: imagesDataObj,
			isLoginClicked: false,
			freePicturesAmount: freePicturesAmount,
			picturePrice: picturePrice,
			discountProcent: discountProcent
		});
	};

	onLogoutHandler = () => {
		window.location.reload();
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

	onCheckoutReleaseHandler = () => {
		this.setState({ isCheckout: true });
	};

	onCheckoutCloseHandler = () => {
		this.setState({ isCheckout: false });
	};

	onAuthenticationHandler = () => {
		this.setState({ isAuthenticated: true });
	};

	onModalSpinnerHandler = (value) => {
		this.setState({ isModalSpinner: value });
	};

	onIsLoginClickedHandler = () => {
		this.setState({ isLoginClicked: false });
	};

	onIsAdminLoginHandler = () => {
		this.setState({ isAdminLogin: true });
	};

	onChangeUserNameHandler = (userName) => {
		this.setState({ userName: userName });
	};

	selectedfilesHandler = (files) => {
		this.setState({ selectedfiles: files });
	};

	adminLoginHandler = () => {
		this.setState({ isAdminLogin: true });
	};

	onChangeUserNameHandler = (userName) => {
		this.setState({ userName: userName, createUserLogin: userName });
	};

	imagesDataObjHandler = (images) => {
		this.setState({ imagesDataObj: images });
	};

	loginClickedHandler = () => {
		this.setState({ isLoginClicked: false });
	};

	onUserCreatedHandler = () => {
		this.setState({ isUserCreated: true });
	};

	render() {
		const { classes } = this.props;

		let adminPanel = null;
		let login = null;
		let menuHideButton = null;
		let footerBar = null;
		let imagesGeneratorAndCounter = null;

		if (this.state.isAdminLogin) {
			adminPanel = (
				<React.Fragment>
					<CreateUser
						clicked={this.onLogoutHandler}
						adminLogin={this.adminLoginHandler}
						onChangeUserName={this.onChangeUserNameHandler}
						freePicturesAmount={this.state.freePicturesAmount}
						picturePrice={this.state.picturePrice}
						discountProcent={this.state.discountProcent}
						imagesAmount={this.state.imagesDataObj ? Object.keys(this.state.imagesDataObj).length : 0}
						loginClicked={this.loginClickedHandler}
						uploadSelectedImages={this.state.selectedfiles}
						onUserCreated={this.onUserCreatedHandler}
					/>

					<Uploader
						userName={this.state.userName}
						uploadSelectedImages={this.state.selectedfiles}
						isButtonDisabled={this.state.isButtonDisabled}
						disableButton={this.disableUploadButtonHandler}
						imagesAmount={this.state.imagesDataObj ? Object.keys(this.state.imagesDataObj).length : 0}
						loginClicked={this.loginClickedHandler}
						selectedfiles={this.selectedfilesHandler}
						isUserCreated={this.state.isUserCreated}
						imagesDataObj={this.imagesDataObjHandler}
					/>
				</React.Fragment>
			);
		}

		if (!this.state.isAdminLogin && !this.state.isAuthenticated) {
			login = (
				<Login
					onLogin={this.onLoginClickedHandler}
					onIsAdminLogin={this.onIsAdminLoginHandler}
					onIsLoginClicked={this.onIsLoginClickedHandler}
					onChangeUserName={this.onChangeUserNameHandler}
					isCreateUserLogin={this.state.createUserLogin}
					isAuthenticated={this.onAuthenticationHandler}
					onLoginDataPass={this.onLoginDataPass}
				/>
			);
		}

		if (this.state.isAuthenticated && !this.state.isCheckout) {
			menuHideButton = (
				<Fab onClick={this.onDrawerOpenHandler} size="small" className={classes.fab}>
					{this.state.isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
				</Fab>
			);
		}

		if (this.state.isAuthenticated) {
			imagesGeneratorAndCounter = (
				<ImagesGeneratorAndCounter
					imagesDataObj={this.state.imagesDataObj}
					freePicturesAmount={this.state.freePicturesAmount}
					discountProcent={this.state.discountProcent}
					picturePrice={this.state.picturePrice}
					images={this.state.picturesPaths}
					titles={this.state.picturesTitles}
					userName={this.state.userName}
					isAdminLogin={this.state.isAdminLogin}
					onHideMenu={this.onDrawerOpenHandler}
					isDrawerOpen={this.state.isDrawerOpen}
					isCheckout={this.state.isCheckout}
					isAuthenticated={this.state.isAuthenticated}
				/>
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
							<AplicationBar
								userName={this.state.userName}
								isAuthenticated={this.state.isAuthenticated}
								imagesDataObj={this.state.imagesDataObj}
								onLogoutHandler={this.onLogoutHandler}
								isAdminLogin={this.state.isAdminLogin}
								onCheckoutRelease={this.onCheckoutReleaseHandler}
								onCheckoutClose={this.onCheckoutCloseHandler}
								isCheckout={this.state.isCheckout}
							/>
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
							{imagesGeneratorAndCounter}
						</div>
					</main>

					<footer>{footerBar}</footer>
				</Layout>
			</React.Fragment>
		);
	}
}

MainView.propTypes = {
	classes: PropTypes.object
};

export default withStyles(styles)(MainView);
