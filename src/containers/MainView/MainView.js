import React, { Component } from 'react';
import ImagesGenerator from '../../components/Shared/ImagesGenerator/ImagesGenerator';
import Uploader from '../../components/AdminPanel/Uploader/Uploader';
import Button from '../../components/Shared/Button/Button';
import Layout from '../../Layout/Layout';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import UserPanel from '../../components/UserPanel/UserPanel';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import classes from './MainView.module.scss';

class MainView extends Component {
	state = {
		userName: '',
		loginField: '',
		isLoginClicked: false,
		createUserField: '',
		imagesDataObj: null,
		selectedfiles: null,
		buttonIsDisabled: true,
		filterButtonsState: false,
		isAdminLogin: false
	};

	componentDidUpdate() {
		if (this.state.loginField && this.state.isLoginClicked && this.state.userName) {
			console.log('fik');

			const userNameDbElement = firebase.database().ref().child(this.state.userName);
			userNameDbElement.on('value', (snapshot) => {
				if (!snapshot.exists()) return;
				const imagesDataObj = snapshot.val();
				this.setState({
					imagesDataObj: imagesDataObj,
					isLoginClicked: false
				});
			});
		}
	}

	onLoginHandler = (e) => {
		//Firebase starts listening for any changes over the user database; if any occurs the app state of user data is changing also
		if (e) e.preventDefault();
		if (this.state.loginField === 'admin') {
			this.setState({
				isAdminLogin: true,
				isLoginClicked: true
			});
		} else {
			console.log('else');

			this.setState({
				userName: this.state.loginField,
				isLoginClicked: true
			});
		}
	};

	onLogoutHandler = (e) => {
		this.setState({
			userName: '',
			loginField: '',
			isLoginClicked: false,
			createUserField: '',
			imagesDataObj: null,
			selectedfiles: null,
			buttonIsDisabled: true,
			filterButtonsState: false,
			isAdminLogin: false
		});
	};

	onCreateUserHandler = (e) => {
		e.preventDefault();
		this.setState({
			isAdminLogin: true,
			userName: this.state.createUserField
		});
		this.onLoginHandler();
	};

	getSelectedImagesHandler = (files) => {
		this.setState({
			selectedfiles: files,
			buttonIsDisabled: false
		});
	};

	disableUploadButtonHandler = () => {
		this.setState({
			buttonIsDisabled: true
		});
	};

	filterButtonsStateHandler = (buttonsStateObj) => {
		this.setState({
			filterButtonsState: buttonsStateObj
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
						loginInputValue={this.state.createUserField}
						createUserField={(e) => this.setState({ createUserField: e.target.value })}
						buttonCreate={(e) => this.onCreateUserHandler(e)}
					/>
					<Uploader
						userName={this.state.userName}
						pickSelectedImages={this.getSelectedImagesHandler}
						uploadSelectedImages={this.state.selectedfiles}
						isButtonDisabled={this.state.buttonIsDisabled}
						disableButton={this.disableUploadButtonHandler}
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
					<Button clicked={(e) => this.onLoginHandler(e)} buttonText="Login" buttonColor="Button__blue" />
				</React.Fragment>
			);
		}

		return (
			<Layout>
				<div className={classes.MainView}>
					<h4>User name: {this.state.userName}</h4>
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
						/>
					</div>
				</div>
			</Layout>
		);
	}
}

export default MainView;
