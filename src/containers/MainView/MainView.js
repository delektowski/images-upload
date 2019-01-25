import React, { Component } from 'react';
import ImagesGenerator from '../../components/Shared/ImagesGenerator/ImagesGenerator';
import Button from '../../components/Shared/Button/Button';
import Layout from '../../hoc/Layout/Layout';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import UserPanel from '../../components/UserPanel/UserPanel';
import Backdrop from '../../components/Shared/Backdrop/Backdrop';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import classes from './MainView.module.scss';

class MainView extends Component {
	state = {
		userName: '',
		loginField: 'marcin',
		passwordField: 'marcin',
		isLoginClicked: false,
		isCreateClicked: false,
		createUserLogin: '',
		createUserPassword: '',
		freePicturesAmount: 5,
		discountProcent: 50,
		picturePrice: 10,
		imagesDataObj: null,
		selectedfiles: null,
		buttonIsDisabled: true,
		filterButtonsState: false,
		isAdminLogin: false,
		isEnabledBackdrop: false
	};

	onLoginHandler = (e) => {
		if (e) e.preventDefault();
		if (this.state.loginField === 'admin' && this.state.passwordField === 'admin') {
			this.setState({
				isAdminLogin: true,
				isLoginClicked: true
			});
		} else {
			this.setState({
				userName: this.state.loginField,
				isLoginClicked: true
			});
		}

		if (
			this.state.loginField &&
			this.state.passwordField &&
			this.state.loginField !== 'admin' &&
			this.state.createUserLogin === ''
		) {
			firebase
				.auth()
				.signInWithEmailAndPassword(`${this.state.loginField}@aaa.aa`, this.state.passwordField)
				.catch(function(error) {
					console.log('Login Error: ', error);
				});

			firebase.auth().onAuthStateChanged((user) => {
				console.log('KOKO1');

				if (user) {
					console.log('loginField', this.state.loginField);
					const userNameDbElement = firebase.database().ref(this.state.loginField);
					userNameDbElement.on('value', (snapshot) => {
						if (!snapshot.exists()) return;
						const imagesDataObj = snapshot.val();
						this.setState({
							imagesDataObj: imagesDataObj.images,
							isLoginClicked: false,
							freePicturesAmount: imagesDataObj.paymentConfig.freePicturesAmount,
							picturePrice: imagesDataObj.paymentConfig.picturePrice,
							discountProcent: imagesDataObj.paymentConfig.discountProcent
						});
					});
				}
			});
		}
	};

	onLogoutHandler = (e) => {
		if (this.state.userName) firebase.database().ref(this.state.userName).off();
		this.setState({
			userName: '',
			loginField: '',
			passwordField: '',
			isLoginClicked: false,
			isCreateClicked: false,
			createUserLogin: '',
			createUserPassword: '',
			imagesDataObj: null,
			selectedfiles: null,
			buttonIsDisabled: true,
			filterButtonsState: false,
			isAdminLogin: false
		});

		firebase
			.auth()
			.signOut()
			.then(function() {
				console.log('Logout');
			})
			.catch(function(error) {
				console.log('Logout: ', error);
			});
	};

	onCreateUserHandler = (e) => {
		e.preventDefault();
		this.setState({
			isAdminLogin: true,
			userName: this.state.createUserLogin
		});
		firebase
			.auth()
			.createUserWithEmailAndPassword(`${this.state.createUserLogin}@aaa.aa`, this.state.createUserPassword)
			.then((resp) => console.log(`${resp.user.email} is ${resp.operationType}`))
			.catch(function(error) {
				console.log('Create error: ', error);
			});
		firebase.auth().onAuthStateChanged((user) => {
			console.log('create free', this.state.freePicturesAmount);

			if (user) {
				firebase.database().ref(this.state.userName + '/').child('paymentConfig').set({
					freePicturesAmount: this.state.freePicturesAmount,
					picturePrice: this.state.picturePrice,
					discountProcent: this.state.discountProcent
				});

				const userNameDbElement = firebase.database().ref(this.state.loginField);
				userNameDbElement.on('value', (snapshot) => {
					if (!snapshot.exists()) return;
					const imagesDataObj = snapshot.val();
					this.setState({
						imagesDataObj: imagesDataObj.images,
						isLoginClicked: false
					});
				});
			}
		});
	};

	getSelectedImagesHandler = (files) => {
		this.setState({
			selectedfiles: files,
			buttonIsDisabled: false
		});
	};

	disableUploadButtonHandler = () => {
		console.log('disable');

		this.setState({
			buttonIsDisabled: true
		});
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const userNameDbElement = firebase.database().ref(this.state.userName);
				userNameDbElement.on('value', (snapshot) => {
					if (!snapshot.exists()) return;
					const imagesDataObj = snapshot.val();
					this.setState({
						imagesDataObj: imagesDataObj.images,
						isLoginClicked: false
					});
				});
			}
		});
	};

	filterButtonsStateHandler = (buttonsStateObj) => {
		this.setState({
			filterButtonsState: buttonsStateObj
		});
	};

	changeDiscountValueHandler = (value) => {
		this.setState({
			discountProcent: value
		});
	};
	changeFreePicturesAmountHandler = (value) => {
		this.setState({
			freePicturesAmount: value
		});
	};
	changepicturePriceHandler = (value) => {
		this.setState({
			picturePrice: value
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
		let adminPanel = null;
		let userPanel = null;
		let login = null;
		if (this.state.isAdminLogin) {
			adminPanel = (
				<React.Fragment>
					<AdminPanel
						logout={(e) => this.onLogoutHandler(e)}
						loginInputValue={this.state.createUserLogin}
						passwordInputValue={this.state.createUserPassword}
						createUserLogin={(e) => this.setState({ createUserLogin: e.target.value })}
						createUserPassword={(e) => this.setState({ createUserPassword: e.target.value })}
						buttonCreate={(e) => this.onCreateUserHandler(e)}
						userName={this.state.userName}
						pickSelectedImages={this.getSelectedImagesHandler}
						uploadSelectedImages={this.state.selectedfiles}
						isButtonDisabled={this.state.buttonIsDisabled}
						disableButton={this.disableUploadButtonHandler}
						freePicturesAmount={this.state.freePicturesAmount}
						changeFreePicturesAmount={this.changeFreePicturesAmountHandler}
						discountProcent={this.state.discountProcent}
						changeDiscountValue={this.changeDiscountValueHandler}
						picturePrice={this.state.picturePrice}
						changePicturePrice={this.changepicturePriceHandler}
						imagesAmount={this.state.imagesDataObj ? Object.keys(this.state.imagesDataObj).length : 0}
					/>
				</React.Fragment>
			);
		}
		if (this.state.userName && !this.state.isAdminLogin) {
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
					/>
				</React.Fragment>
			);
		}
		if (!this.state.isAdminLogin && !this.state.userName) {
			login = (
				<React.Fragment>
					<label>Login:</label>
					<input
						placeholder="user login"
						value={this.state.loginField}
						onChange={(e) => this.setState({ loginField: e.target.value })}
						onKeyPress={(e) => {
							if (e.key === 'Enter') this.onLoginHandler(e);
						}}
					/>
					<label>Password:</label>
					<input
						placeholder="user password"
						value={this.state.passwordField}
						onChange={(e) => this.setState({ passwordField: e.target.value })}
						onKeyPress={(e) => {
							if (e.key === 'Enter') this.onLoginHandler(e);
						}}
					/>
					<Button clicked={(e) => this.onLoginHandler(e)} buttonText="Login" buttonColor="Button__blue" />
				</React.Fragment>
			);
		}

		return (
			<Layout>
				<div className={classes.MainView}>
					<h4>User name: {this.state.userName}</h4>
					<Backdrop show={this.state.isEnabledBackdrop} disableBackdrop={this.backdropHandler} />
					{login}
					{adminPanel}
					{userPanel}
					<div className={classes.MainView__imagesContainer}>
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
		);
	}
}

export default MainView;
