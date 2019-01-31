import React, { Component } from 'react';
import ImagesGenerator from '../../components/Shared/ImagesGenerator/ImagesGenerator';
import Login from '../../components/Login/Login';
import Layout from '../../hoc/Layout/Layout';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import UserPanel from '../../components/UserPanel/UserPanel';
import Backdrop from '../../components/Shared/Backdrop/Backdrop';
import Logout from '../../components/Logout/Logout';
import { AppBar, Toolbar, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	header: {
		background: 'whitesmoke',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed'
	},
	toolbar__header: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '98%'
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
		textAlign: 'center'
	},
	mainView: {
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'column',
		paddingTop: '2%'
	}
};

class mainView extends Component {
	state = {
		userName: '',
		isLoginClicked: false,
		isCreateClicked: false,
		createUserLogin: '',
		createUserPassword: '',
		loginField: 'admin',
		passwordField: 'admin78',
		imagesDataObj: null,
		selectedfiles: 0,
		isButtonDisabled: true,
		filterButtonsState: false,
		isAdminLogin: false,
		isEnabledBackdrop: false,
		isAuthenticated: false,
		errorLogin: '',
		onUserCreated: false
	};

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
			loginField: 'admin',
			passwordField: 'admin78',
			imagesDataObj: null,
			selectedfiles: 0,
			isButtonDisabled: true,
			filterButtonsState: false,
			isAdminLogin: false,
			isEnabledBackdrop: false,
			isAuthenticated: false,
			errorLogin: '',
			isUserCreated: false
		});
	};

	filterButtonsStateHandler = (buttonsStateObj) => {
		this.setState({
			filterButtonsState: buttonsStateObj
		});
	};

	backdropHandler = () => {
		this.setState((prevState) => {
			return {
				isEnabledBackdrop: !prevState.isEnabledBackdrop
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
						filterButtonsState={this.filterButtonsStateHandler}
						userName={this.state.userName}
						freePicturesAmount={this.state.freePicturesAmount}
						discountProcent={this.state.discountProcent}
						picturePrice={this.state.picturePrice}
						onLogoutHandler={this.onLogoutHandler}
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
				<header>
					<AppBar className={classes.header} position="static" color="default">
						<Toolbar className={classes.toolbar__header}>
							<Typography variant="overline" color="inherit">
								Peek Pick Pic
							</Typography>
							{this.state.isAdminLogin ? (
								<Logout userName={this.state.userName} onLogoutHandler={this.onLogoutHandler} />
							) : null}
						</Toolbar>
					</AppBar>
				</header>
				<section>
					<Layout>
						<div className={classes.mainView}>
							{this.state.errorLogin ? <p>{this.state.errorLogin}</p> : null}
							<Backdrop show={this.state.isEnabledBackdrop} disableBackdrop={this.backdropHandler} />
							{login}
							{adminPanel}
							{userPanel}
							<div className={classes.mainView__imagesContainer}>
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
						</div>
					</Layout>
				</section>
				<footer>
					<AppBar className={classes.footer} position="static" color="default">
						<Toolbar className={classes.toolbar__footer}>
							<Typography variant="caption" color="inherit">
								Created by Marcin Delektowski
							</Typography>
						</Toolbar>
					</AppBar>
				</footer>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(mainView);
